const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// GET user's watchlist
router.get('/', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ queue: user.queue, watched: user.watched });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// ADD a movie to queue
router.post('/queue', protect, async (req, res) => {
    try {
        const movie = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $addToSet: { queue: movie } }, // $addToSet prevents duplicates
            { new: true }
        );
        res.status(201).json(user.queue);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// REMOVE a movie from queue
router.delete('/queue/:movieId', protect, async (req, res) => {
    try {
        const { movieId } = req.params;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { queue: { id: parseInt(movieId) } } },
            { new: true }
        );
        res.json(user.queue);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// REMOVE a movie from watched
router.delete('/watched/:movieId', protect, async (req, res) => {
    console.log('DELETE /watched/:movieId route hit!');
    console.log('Request params:', req.params);
    console.log('Request URL:', req.url);
    
    try {
        const { movieId } = req.params;
        console.log('Removing movie from watched:', movieId);
        console.log('User ID:', req.user.id);
        
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { watched: { id: parseInt(movieId) } } },
            { new: true }
        );
        
        console.log('Updated user watched list:', user.watched);
        res.json(user.watched);
    } catch (error) {
        console.error('Error removing from watched:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// MOVE movie from queue to watched
router.post('/watched', protect, async (req, res) => {
    try {
        const movie = req.body;
        // First, add to watched list
        await User.findByIdAndUpdate(
            req.user.id,
            { $addToSet: { watched: movie } },
        );
        // Then, remove from queue
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { queue: { id: movie.id } } },
            { new: true }
        );
        res.json({ queue: user.queue, watched: user.watched });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;