import express from 'express';
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  toggleAvailability,
  deleteMenuItem,
} from '../controllers/menu.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';

const router = express.Router();

// Public menu browsing
router.get('/', getMenuItems);

// Admin / Staff protected menu actions
router.post('/', protect, authorize('admin', 'staff'), createMenuItem);
router.put('/:id', protect, authorize('admin', 'staff'), updateMenuItem);
router.patch('/:id/toggle', protect, authorize('admin', 'staff'), toggleAvailability);
router.delete('/:id', protect, authorize('admin'), deleteMenuItem);

export default router;
