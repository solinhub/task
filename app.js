// dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const authenticateToken = require('./middlewares/auth');
const authorizeAdmin = require('./middlewares/authz');
const validateData = require('./middlewares/validation');
const connectDB = require('./db');
const { createRoomType, getAllRoomTypes } = require('./controllers/room-type');
const {
	createRoom,
	getAllRooms,
	getRoomById,
	updateRoom,
	deleteRoom,
} = require('./controllers/room');
const Joi = require('joi');

dotenv.config();

// Connect to MongoDB
connectDB();

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// JWT secret
const jwtSecret = process.env.JWT_SECRET;

// Joi validation schema for user registration
const validateUser = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('guest', 'admin').default('guest'),
});

// JWT token generation
function generateAccessToken(user) {
    return jwt.sign(user, jwtSecret, { expiresIn: '15m' });
}

// Routes
app.post('/api/v1/login', async (req, res) => {
    // Login route
});

app.post('/api/v1/register', validateData(validateUser), async (req, res) => {
    // Register route
});

app.use('/api/v1/room-types', authenticateToken);
app.use('/api/v1/rooms', authenticateToken);


app.post('/api/v1/room-types', authenticateToken, authorizeAdmin, validateData, createRoomType);
app.get('/api/v1/room-types', authenticateToken, getAllRoomTypes);
app.post('/api/v1/rooms', authenticateToken, createRoom);
app.get('/api/v1/rooms', authenticateToken, getAllRooms);
app.get('/api/v1/rooms/:id', authenticateToken, getRoomById);
app.patch('/api/v1/rooms/:id', authenticateToken, updateRoom);
app.delete('/api/v1/rooms/:id', authenticateToken, deleteRoom);


// Define PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
