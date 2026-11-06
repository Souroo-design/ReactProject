import { Reservation } from '../models/Reservation.js';
import mongoose from 'mongoose';

export let mockReservations = [];

export const createReservation = async (req, res, next) => {
  try {
    const {
      restaurantName,
      guestName,
      guestEmail,
      guestPhone,
      partySize,
      reservationDate,
      timeSlot,
      seatingPreference,
      specialRequests,
      preOrderedItems,
      totalAmount,
      orderType,
      deliveryAddress,
      paymentMethod,
      paymentStatus,
      transactionId,
    } = req.body;

    if (!guestName || !guestEmail || !guestPhone || !partySize || !reservationDate || !timeSlot) {
      return res.status(400).json({ success: false, message: 'Please complete all required reservation fields' });
    }

    const userId = req.user ? (req.user.id || req.user._id) : null;
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const reservation = await Reservation.create({
        user: userId,
        restaurantName: restaurantName || 'Bukhara Royal Grill',
        guestName,
        guestEmail: guestEmail.trim(),
        guestPhone,
        partySize: Number(partySize),
        reservationDate,
        timeSlot,
        seatingPreference: seatingPreference || 'Standard',
        specialRequests: specialRequests || '',
        preOrderedItems: Array.isArray(preOrderedItems) ? preOrderedItems : [],
        totalAmount: Number(totalAmount) || 0,
        orderType: orderType || 'Dine-In Table',
        deliveryAddress: deliveryAddress || '',
        paymentMethod: paymentMethod || 'Cash',
        paymentStatus: paymentStatus || 'cash_on_delivery',
        transactionId: transactionId || null,
        status: 'pending',
      });

      return res.status(201).json({ success: true, data: reservation });
    } else {
      const newReservation = {
        _id: 'res_' + Date.now(),
        user: userId,
        restaurantName: restaurantName || 'Bukhara Royal Grill',
        guestName,
        guestEmail: guestEmail.trim(),
        guestPhone,
        partySize: Number(partySize),
        reservationDate,
        timeSlot,
        seatingPreference: seatingPreference || 'Standard',
        specialRequests: specialRequests || '',
        preOrderedItems: Array.isArray(preOrderedItems) ? preOrderedItems : [],
        totalAmount: Number(totalAmount) || 0,
        orderType: orderType || 'Dine-In Table',
        deliveryAddress: deliveryAddress || '',
        paymentMethod: paymentMethod || 'Cash',
        paymentStatus: paymentStatus || 'cash_on_delivery',
        transactionId: transactionId || null,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      mockReservations.unshift(newReservation);
      return res.status(201).json({ success: true, data: newReservation });
    }
  } catch (error) {
    next(error);
  }
};

export const getMyReservations = async (req, res, next) => {
  try {
    const { extraIds } = req.query;
    const localIds = extraIds ? extraIds.split(',').map((id) => id.trim()).filter(Boolean) : [];

    const userId = req.user ? (req.user.id || req.user._id) : null;
    const userEmail = req.user && req.user.email ? req.user.email.trim().toLowerCase() : null;
    
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const queryConditions = [];

      if (userId) {
        queryConditions.push({ user: userId });
      }
      if (userEmail) {
        queryConditions.push({ guestEmail: { $regex: new RegExp(`^${userEmail}$`, 'i') } });
      }
      if (localIds.length > 0) {
        const validObjectIds = localIds.filter((id) => mongoose.Types.ObjectId.isValid(id));
        if (validObjectIds.length > 0) {
          queryConditions.push({ _id: { $in: validObjectIds } });
        }
      }

      if (queryConditions.length === 0) {
        return res.status(200).json({ success: true, count: 0, data: [] });
      }

      const reservations = await Reservation.find({ $or: queryConditions }).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: reservations.length, data: reservations });
    } else {
      const myRes = mockReservations.filter((r) => {
        const matchesUser = userId && (r.user === userId || r.user === req.user?.id);
        const matchesEmail = userEmail && r.guestEmail?.trim().toLowerCase() === userEmail;
        const matchesLocalId = localIds.includes(r._id);
        return matchesUser || matchesEmail || matchesLocalId;
      });
      return res.status(200).json({ success: true, count: myRes.length, data: myRes });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllReservations = async (req, res, next) => {
  try {
    const { date, status, restaurantName } = req.query;
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const query = {};
      if (date) query.reservationDate = date;
      if (status && status !== 'all') query.status = status;
      if (restaurantName && restaurantName !== 'All') query.restaurantName = restaurantName;

      const reservations = await Reservation.find(query).sort({ reservationDate: 1, timeSlot: 1 });
      return res.status(200).json({ success: true, count: reservations.length, data: reservations });
    } else {
      let filtered = [...mockReservations];
      if (date) filtered = filtered.filter((r) => r.reservationDate === date);
      if (status && status !== 'all') filtered = filtered.filter((r) => r.status === status);
      if (restaurantName && restaurantName !== 'All') filtered = filtered.filter((r) => r.restaurantName === restaurantName);

      return res.status(200).json({ success: true, count: filtered.length, data: filtered });
    }
  } catch (error) {
    next(error);
  }
};

export const updateReservationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['pending', 'confirmed', 'seated', 'completed', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const reservation = await Reservation.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
      if (!reservation) {
        return res.status(404).json({ success: false, message: 'Reservation not found' });
      }
      return res.status(200).json({ success: true, data: reservation });
    } else {
      const resItem = mockReservations.find((r) => r._id === id);
      if (!resItem) {
        return res.status(404).json({ success: false, message: 'Reservation not found' });
      }
      resItem.status = status;
      return res.status(200).json({ success: true, data: resItem });
    }
  } catch (error) {
    next(error);
  }
};
