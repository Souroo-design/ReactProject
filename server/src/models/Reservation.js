import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    restaurantName: {
      type: String,
      required: [true, 'Restaurant selection is required'],
      default: 'Bukhara Royal Grill',
    },
    guestName: {
      type: String,
      required: [true, 'Guest name is required'],
    },
    guestEmail: {
      type: String,
      required: [true, 'Guest email is required'],
    },
    guestPhone: {
      type: String,
      required: [true, 'Guest phone is required'],
    },
    partySize: {
      type: Number,
      required: [true, 'Party size is required'],
      min: 1,
      max: 20,
    },
    reservationDate: {
      type: String, // Format: YYYY-MM-DD
      required: [true, 'Reservation date is required'],
    },
    timeSlot: {
      type: String, // Format e.g., "18:00", "19:30"
      required: [true, 'Time slot is required'],
    },
    seatingPreference: {
      type: String,
      enum: ['Standard', 'Window', 'Outdoor Patio', 'Private Booth'],
      default: 'Standard',
    },
    specialRequests: {
      type: String,
      default: '',
    },
    preOrderedItems: [
      {
        menuItemId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
    orderType: {
      type: String,
      enum: ['Dine-In Table', 'Takeaway Pickup', 'Doorstep Delivery'],
      default: 'Dine-In Table',
    },
    deliveryAddress: {
      type: String,
      default: '',
    },
    paymentMethod: {
      type: String,
      enum: ['Cash', 'QR Code Scan', 'UPI', 'Credit/Debit Card', 'Pay at Restaurant'],
      default: 'Cash',
    },
    paymentStatus: {
      type: String,
      enum: ['pay_at_counter', 'cash_on_delivery', 'completed', 'pending', 'refunded'],
      default: 'cash_on_delivery',
    },
    transactionId: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'seated', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Reservation = mongoose.model('Reservation', reservationSchema);
