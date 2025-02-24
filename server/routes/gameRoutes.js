// routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Example endpoints:
router.post('/create', gameController.createGame);
router.post('/join', gameController.joinGame);
router.put('/update/:gameId', gameController.updateGame);

module.exports = router;