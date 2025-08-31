// Cancel long-running operations cleanly
const controller = new AbortController();

// Set up automatic cancellation
setTimeout(() => controller.abort(), 10000);

try {
  const data = await fetch('https://slow-api.com/data', {
    signal: controller.signal
  });
  console.log('Data received:', data);
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled - this is expected behavior');
  } else {
    console.error('Unexpected error:', error);
  }
}
