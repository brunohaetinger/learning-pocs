// .env file automatically loaded with --env-file

// app.js - Environment variables available immediately
console.log('Connecting to:', process.env.DATABASE_URL);
console.log('API Key loaded:', process.env.API_KEY ? 'Yes' : 'No');
