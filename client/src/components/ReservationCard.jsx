import React from 'react';
import {
  Calendar, Clock, Users, MapPin, Mail, Phone, MessageSquare,
  CheckCircle, Clock3, AlertCircle, XCircle, Store, Utensils,
  Bike, ShoppingBag, Banknote, QrCode, Lock,
} from 'lucide-react';

export const ReservationCard = ({ reservation, isStaffView = false, onStatusChange }) => {
  const {
    _id,
    restaurantName,
    guestName,
    guestEmail,
    guestPhone,
    partySize,
    reservationDate,
    timeSlot,
    seatingPreference,
    orderType,
    deliveryAddress,
    paymentMethod,
    paymentStatus,
    transactionId,
    specialRequests,
    preOrderedItems,
    totalAmount,
    status,
    createdAt,
  } = reservation;

  const statusColors = {
    pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    confirmed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    seated: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    completed: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    cancelled: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
  };

  const statusIcons = {
    pending: <Clock3 className="w-3.5 h-3.5" />,
    confirmed: <CheckCircle className="w-3.5 h-3.5" />,
    seated: <Users className="w-3.5 h-3.5" />,
    completed: <CheckCircle className="w-3.5 h-3.5" />,
    cancelled: <XCircle className="w-3.5 h-3.5" />,
  };

  return (
    <div className="glass-card rounded-3xl p-6 shadow-md border border-slate-200/80 dark:border-slate-800 space-y-4 hover:shadow-lg transition-all">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Store className="w-3.5 h-3.5" />
              {restaurantName || 'Bukhara Royal Grill'}
            </span>

            {/* Service & Delivery Mode Badge */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {orderType === 'Doorstep Delivery' ? (
                <Bike className="w-3.5 h-3.5 text-rose-500" />
              ) : orderType === 'Takeaway Pickup' ? (
                <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
              ) : (
                <Store className="w-3.5 h-3.5 text-emerald-500" />
              )}
              {orderType || 'Dine-In Table'}
            </span>

            {/* Payment Status & Method Badge */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                paymentStatus === 'completed'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
              }`}
            >
              {paymentMethod?.includes('QR') ? (
                <QrCode className="w-3.5 h-3.5" />
              ) : paymentMethod === 'Cash' ? (
                <Banknote className="w-3.5 h-3.5" />
              ) : (
                <Lock className="w-3.5 h-3.5" />
              )}
              {paymentStatus === 'completed'
                ? `Paid Online (${transactionId || 'Confirmed'})`
                : paymentStatus === 'cash_on_delivery'
                ? 'Cash on Delivery'
                : 'Pay Cash at Counter'}
            </span>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {guestName}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Booking ID: <span className="font-mono">{_id.substring(_id.length - 8)}</span>
            {deliveryAddress && (
              <span className="ml-2 font-normal text-slate-600 dark:text-slate-400">
                • Delivery to: {deliveryAddress}
              </span>
            )}
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
            statusColors[status] || statusColors.pending
          }`}
        >
          {statusIcons[status]}
          {status}
        </span>
      </div>

      {/* Reservation Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="flex items-center gap-2 bg-slate-100/70 dark:bg-slate-800/50 p-2.5 rounded-2xl">
          <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase text-slate-400 font-semibold">Date</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{reservationDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100/70 dark:bg-slate-800/50 p-2.5 rounded-2xl">
          <Clock className="w-4 h-4 text-amber-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase text-slate-400 font-semibold">Time Slot</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{timeSlot}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100/70 dark:bg-slate-800/50 p-2.5 rounded-2xl">
          <Users className="w-4 h-4 text-amber-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase text-slate-400 font-semibold">Party Size</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{partySize} Guests</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100/70 dark:bg-slate-800/50 p-2.5 rounded-2xl">
          <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase text-slate-400 font-semibold">Seating</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{seatingPreference}</p>
          </div>
        </div>
      </div>

      {/* Pre-Ordered Food Items Section */}
      {Array.isArray(preOrderedItems) && preOrderedItems.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
          <div className="flex items-center justify-between font-bold text-amber-800 dark:text-amber-300">
            <span className="flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-amber-500" />
              Pre-Ordered Dishes ({preOrderedItems.length}):
            </span>
            <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
              Total Pre-Order: ₹{Number(totalAmount || 0).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {preOrderedItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800"
              >
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {item.name} <span className="text-amber-600 font-bold">x{item.quantity}</span>
                </span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact & Special Requests */}
      <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex flex-wrap gap-4">
          <span className="flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            {guestEmail}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            {guestPhone}
          </span>
        </div>

        {specialRequests && (
          <div className="mt-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <span>
              <strong>Special Request:</strong> {specialRequests}
            </span>
          </div>
        )}
      </div>

      {/* Staff Actions Control Bar */}
      {isStaffView && onStatusChange && (
        <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-500">Update Booking Status:</span>
          <div className="flex gap-1.5 flex-wrap">
            {['confirmed', 'seated', 'completed', 'cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => onStatusChange(_id, st)}
                disabled={status === st}
                className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                  status === st
                    ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 cursor-default'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white text-slate-700 dark:text-slate-300'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
