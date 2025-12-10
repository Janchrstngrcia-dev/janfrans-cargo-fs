const express = require('express');
const router = express.Router();
const { createClient, getClients } = require('../controllers/clientController');
const { protect } = require('../middleware/authMiddleware'); 

router.get('/', protect, getClients);
router.post('/add', protect, createClient);

module.exports = router;