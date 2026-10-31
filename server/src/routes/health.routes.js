import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };

  res.status(200).json({
    status: 'ok',
    message: 'DineEase API Server is healthy and running',
    timestamp: new Date().toISOString(),
    uptimeSeconds: process.uptime(),
    database: {
      state: states[dbState] || 'unknown',
      connected: dbState === 1,
    },
  });
});

export default router;
