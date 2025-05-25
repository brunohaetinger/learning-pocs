// app.js
const express = require('express');
const { MeterProvider } = require('@opentelemetry/sdk-metrics');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

// Setup Prometheus Exporter
const prometheusExporter = new PrometheusExporter(
  { port: 9464, endpoint: '/metrics' },
  () => console.log('Prometheus scrape endpoint: http://localhost:9464/metrics')
);

// Setup Meter Provider and Reader
const meterProvider = new MeterProvider({
  readers: [prometheusExporter],
});
const meter = meterProvider.getMeter('my-service');

// Create some custom metrics
const requestCounter = meter.createCounter('http_requests_total', {
  description: 'Total number of HTTP requests',
});

const requestDuration = meter.createHistogram('http_request_duration_seconds', {
  description: 'Duration of HTTP requests in seconds',
});

const activeRequests = meter.createUpDownCounter('active_requests', {
  description: 'Number of active HTTP requests',
});

// Create Express app
const app = express();
const port = 3000;

// Middleware to track metrics
app.use((req, res, next) => {
  const startTime = process.hrtime();
  activeRequests.add(1);

  res.on('finish', () => {
    activeRequests.add(-1);
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const durationInSeconds = seconds + nanoseconds / 1e9;

    requestCounter.add(1, {
      route: req.path,
      method: req.method,
      status: res.statusCode,
    });

    requestDuration.record(durationInSeconds, {
      route: req.path,
      method: req.method,
      status: res.statusCode,
    });
  });

  next();
});

// Example routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/slow', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  res.send('This was a slow request.');
});

// Start the app
app.listen(port, () => {
  console.log(`Example app running at http://localhost:${port}`);
});
