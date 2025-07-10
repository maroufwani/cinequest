const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/watchlist', require('./routes/watchlistRoutes'));

// Add a test route to verify server is working
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working' });
});

// Serve static files from the React app build directory
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    // The "catchall" handler: send back React's index.html file.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Available routes:');
    console.log('- GET /api/test');
    console.log('- POST /api/auth/register');
    console.log('- POST /api/auth/login');
    console.log('- GET /api/watchlist');
    console.log('- POST /api/watchlist/queue');
    console.log('- DELETE /api/watchlist/queue/:movieId');
    console.log('- POST /api/watchlist/watched');
    console.log('- DELETE /api/watchlist/watched/:movieId');
});