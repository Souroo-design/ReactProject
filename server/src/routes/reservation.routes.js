import express from 'express';
import {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservationStatus,
} from '../controllers/reservation.controller.js';
import { protect, optionalAuth } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';

const router = express.Router();

// Anyone can create a reservation (optionalAuth attaches user if logged in)
router.post('/', optionalAuth, createReservation);

// Customer or Guest gets their own reservations
router.get('/my', optionalAuth, getMyReservations);

// Staff and Admin view all reservations & update status
router.get('/', protect, authorize('admin', 'staff'), getAllReservations);
router.patch('/:id/status', protect, authorize('admin', 'staff'), updateReservationStatus);

export default router;
