# OpenTelemetry Metrics with Express and Prometheus

This project demonstrates how to collect HTTP request metrics from an Express.js application using OpenTelemetry MeterProvider and export them to Prometheus.

## Project Goal

The primary goal of this project is to provide a simple, runnable example of integrating OpenTelemetry metrics into a Node.js Express application. It shows how to:
- Initialize an OpenTelemetry MeterProvider.
- Use a Prometheus exporter to expose metrics in a format that Prometheus can scrape.
- Create and record data for different types of metrics (Counter, Histogram, UpDownCounter) based on incoming HTTP requests.

## Metrics Collected

The application collects the following metrics for incoming HTTP requests:

- `http_requests_total`: A counter for the total number of HTTP requests received, tagged with `route`, `method`, and `status`.
- `http_request_duration_seconds`: A histogram for the duration of HTTP requests in seconds, tagged with `route`, `method`, and `status`.
- `active_requests`: An UpDownCounter for the number of currently active HTTP requests.

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (LTS recommended)
- npm or yarn
- Docker and Docker Compose (for running Prometheus)

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```
    (Replace `<repository_url>` and `<repository_directory>` with the actual details if this project is in a repository.)

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Prometheus:**
    This project includes a `docker-compose.yml` file to run a Prometheus instance.
    ```bash
    docker-compose up -d
    ```
    This will start a Prometheus container. Prometheus will be accessible at `http://localhost:9090`.

4.  **Configure Prometheus to scrape metrics:**
    The `prometheus.yml` file in this repository is pre-configured to scrape metrics from the Node.js application's `/metrics` endpoint. Ensure your Prometheus configuration includes a scrape job for your application. The provided `docker-compose.yml` mounts this `prometheus.yml` file into the Prometheus container.

## Running the Application

Start the Node.js application:

```bash
node app.js
```

The application will start on `http://localhost:3000`, and the Prometheus metrics will be exposed at `http://localhost:9464/metrics`.

## Viewing Metrics

1.  Ensure the Node.js application is running (`node app.js`).
2.  Ensure the Prometheus container is running (`docker-compose up -d`).
3.  Open your web browser and navigate to the Prometheus UI at `http://localhost:9090`.
4.  You should be able to query the collected metrics (e.g., `http_requests_total`, `http_request_duration_seconds`, `active_requests`) in the Prometheus expression browser.
