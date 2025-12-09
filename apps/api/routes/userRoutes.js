const express = require( 'express' );
const router = express.Router();
const {
    createUser,
    login,
    getMe,
    createInitialAdmin,
    getAllUsers
} = require( '../controllers/authController' );

const { protect, authorize } = require( '../middleware/authMiddleware' );

// --- Public Routes ---
router.post( '/login', login );
router.post( '/setup-admin', createInitialAdmin );

// --- Protected Routes ---
router.post( '/register', protect, authorize( 'admin' ), createUser );
router.get( '/me', protect, getMe );
router.get( '/users', protect, authorize( 'admin' ), getAllUsers );

module.exports = router;