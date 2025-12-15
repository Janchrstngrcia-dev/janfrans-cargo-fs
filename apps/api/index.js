require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require( './config/database' );

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running...', success: true });
});

// Routes
app.use( '/api/auth', require( './routes/userRoutes' ) );
app.use( '/api/clients', require( './routes/clientRoutes' ) );
app.use( '/api/deliveries', require( './routes/deliveryRoutes' ) );
app.use('/api/vehicles', require('./routes/vehicleRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});