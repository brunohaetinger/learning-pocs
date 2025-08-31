// Old way - external dependencies required
const axios = require('axios');
const response = await axios.get('https://api.example.com/data');

// Modern way - built-in fetch with enhanced features
const response = await fetch('https://api.example.com/data');
const data = await response.json();



async function fetchData(url) {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(5000) // Built-in timeout support
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TimeoutError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}
