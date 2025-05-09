// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));


// Optional: If you need to pass env vars to frontend
// you can set up an API route (e.g., /config)
app.get('/config', (req, res) => {
    res.json({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    });
  });

// Handle /gm and /player routes, but always serve the same index.html
app.get(['/gm', '/player'], (req, res) => {
    const sessionId = req.query.id; // Get the 'id' from the query string (e.g., ?id=SESSION_NAME)
  
    if (sessionId) {
      // Pass the sessionId to the frontend using a query parameter
      res.sendFile(path.join(__dirname, 'public', 'index.html'), {
        headers: {
          'Session-Id': sessionId // Optionally set a custom header for easy access 
        }
      });
    } else {
      // If no session ID is provided, send a 400 error
      res.status(400).send('Session ID is required');
    }
  });





// Fallback to index.html (for SPA routing)
app.get('/public', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
