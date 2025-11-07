require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bottlesRoutes = require('./routes/bottles');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HAL-9001 Backend is running' });
});

app.use('/api/bottles', bottlesRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`HAL-9001 Backend server running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

