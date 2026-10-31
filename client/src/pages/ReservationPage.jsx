import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Users, MapPin, CheckCircle, Sparkles, MessageSquare, Phone, Mail, User, Store, Plus, Minus, Utensils, ArrowRight, ArrowLeft, Star, Check, Sunrise, Sun, Moon, Flame, Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { Link, useLocation } from 'react-router-dom';

export const ReservationPage = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Wizard Step: 1 = Choose Restaurant, 2 = Table & Guest Details, 3 = Pre-Order Food, 4 = Confirmation
  const [step, setStep] = useState(1);

  // Selected Restaurant
  const [selectedRestaurant, setSelectedRestaurant] = useState('Bukhara Royal Grill');

  // Booking Form State
  const [guestName, setGuestName] = useState(user?.name || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [guestPhone, setGuestPhone] = useState(user?.phone || '');
  const [partySize, setPartySize] = useState(2);
  const [reservationDate, setReservationDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('19:00');
  const [seatingPreference, setSeatingPreference] = useState('Standard');
  const [specialRequests, setSpecialRequests] = useState('');

  // Pre-Order State & Filtering
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [menuLoading, setMenuLoading] = useState(false);
  const [preOrderCart, setPreOrderCart] = useState({}); // { itemId: quantity }
  const [preOrderMealFilter, setPreOrderMealFilter] = useState('All');
  const [preOrderDietFilter, setPreOrderDietFilter] = useState('All');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successBooking, setSuccessBooking] = useState(null);

  // Restaurant Outlets Data
  const restaurantsData = [
    {
      id: 'Bukhara Royal Grill',
      name: 'Bukhara Royal Grill',
      cuisine: 'North Indian Tandoor & Royal Mughlai',
      location: 'Connaught Place, New Delhi',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      specialty: 'Dal Bukhara, Galouti Kebabs & Tandoori Malai Tikka',
    },
    {
      id: 'Punjab Dhaba & Rasoi',
      name: 'Punjab Dhaba & Rasoi',
      cuisine: 'Punjabi Dhaba & Clay Oven Delicacies',
      location: 'Grand Trunk Road, Punjab',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      specialty: 'Chole Bhature, Old Delhi Butter Chicken & Sarson Saag',
    },
    {
      id: 'Dakshin South Tiffin Room',
      name: 'Dakshin South Tiffin Room',
      cuisine: 'Traditional South Indian & Chettinad',
      location: 'Indiranagar, Bengaluru',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
      specialty: 'Mysore Masala Dosa, Medu Vada & Chettinad Curry',
    },
    {
      id: 'Hyderabadi Shahi Kitchen',
      name: 'Hyderabadi Shahi Kitchen',
      cuisine: 'Nizami Dum Biryani & Kebabs',
      location: 'Banjara Hills, Hyderabad',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      specialty: 'Hyderabadi Dum Chicken Biryani & Nizam Chicken 65',
    },
  ];

  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  // Sync user details
  useEffect(() => {
    if (user) {
      if (user.name) setGuestName(user.name);
      if (user.email) setGuestEmail(user.email);
      if (user.phone) setGuestPhone(user.phone);
    }
  }, [user]);

  // Load menu for selected restaurant when entering Step 3
  useEffect(() => {
    if (step === 3) {
      const fetchRestaurantMenu = async () => {
        setMenuLoading(true);
        try {
          const { data } = await axiosInstance.get('/menu', {
            params: { restaurantName: selectedRestaurant },
          });
          if (data.success) {
            setRestaurantMenu(data.data);
          }
        } catch (err) {
          console.error('Failed to load menu for pre-order:', err);
        } finally {
          setMenuLoading(false);
        }
      };
      fetchRestaurantMenu();
    }
  }, [step, selectedRestaurant]);

  // Cart helper functions
  const updatePreOrderQuantity = (itemId, change) => {
    setPreOrderCart((prev) => {
      const current = prev[itemId] || 0;
      const updated = Math.max(0, current + change);
      const newCart = { ...prev };
      if (updated > 0) {
        newCart[itemId] = updated;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getPreOrderedItemsList = () => {
    return Object.keys(preOrderCart).map((itemId) => {
      const menuItem = restaurantMenu.find((m) => m._id === itemId);
      return {
        menuItemId: itemId,
        name: menuItem?.name || 'Pre-ordered Dish',
        price: menuItem?.price || 0,
        quantity: preOrderCart[itemId],
      };
    });
  };

  const calculatePreOrderTotal = () => {
    return Object.keys(preOrderCart).reduce((total, itemId) => {
      const menuItem = restaurantMenu.find((m) => m._id === itemId);
      return total + (menuItem?.price || 0) * preOrderCart[itemId];
    }, 0);
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    setError('');
    if (!guestName || !guestEmail || !guestPhone) {
      setError('Please fill in your name, email, and phone number.');
      return;
    }
    setStep(3); // Move to pre-order step
  };

  const handleFinalSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      const preItems = getPreOrderedItemsList();
      const totalAmt = calculatePreOrderTotal();

      const payload = {
        restaurantName: selectedRestaurant,
        guestName,
        guestEmail,
        guestPhone,
        partySize: Number(partySize),
        reservationDate,
        timeSlot,
        seatingPreference,
        specialRequests,
        preOrderedItems: preItems,
        totalAmount: totalAmt,
      };

      const { data } = await axiosInstance.post('/reservations', payload);
      if (data.success) {
        setSuccessBooking(data.data);
        setStep(4); // Move to final receipt step

        // Save reservation ID locally
        try {
          const existingSaved = JSON.parse(localStorage.getItem('dineease_saved_ids') || '[]');
          if (data.data._id && !existingSaved.includes(data.data._id)) {
            existingSaved.push(data.data._id);
            localStorage.setItem('dineease_saved_ids', JSON.stringify(existingSaved));
          }
        } catch (e) {
          console.warn('Could not save reservation ID locally');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete table reservation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          Multi-Step Table Booking Engine
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Reserve Your Table & Pre-Order Meals
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Select an iconic Indian restaurant, pick your table time slot, and pre-order your favorite dishes!
        </p>
      </div>

      {/* Wizard Progress Bar */}
      {step < 4 && (
        <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-around text-xs font-bold">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-500' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
            <span>1. Choose Restaurant</span>
          </div>
          <div className="h-0.5 w-12 bg-slate-300 dark:bg-slate-700 hidden sm:block" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-500' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
            <span>2. Table & Time</span>
          </div>
          <div className="h-0.5 w-12 bg-slate-300 dark:bg-slate-700 hidden sm:block" />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-amber-500' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
            <span>3. Pre-Order Dishes</span>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 text-xs rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-medium">
          {error}
        </div>
      )}

      {/* STEP 1: CHOOSE INDIAN RESTAURANT */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Store className="w-5 h-5 text-amber-500" />
            Step 1: Select Indian Restaurant Outlet to Dine In
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {restaurantsData.map((rest) => (
              <div
                key={rest.id}
                onClick={() => setSelectedRestaurant(rest.name)}
                className={`group rounded-3xl overflow-hidden glass-card border transition-all cursor-pointer hover:shadow-xl p-5 flex flex-col justify-between space-y-4 ${
                  selectedRestaurant === rest.name
                    ? 'border-2 border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-amber-500/50'
                }`}
              >
                <div className="space-y-3">
                  <div className="relative h-36 w-full rounded-2xl overflow-hidden bg-slate-800">
                    <img src={rest.image} alt={rest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-2 right-2 flex items-center gap-1 text-xs font-bold text-amber-300 bg-slate-900/80 px-2 py-0.5 rounded-lg border border-amber-500/30">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {rest.rating}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-between">
                      {rest.name}
                      {selectedRestaurant === rest.name && (
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center">
                          <Check className="w-4 h-4" />
                        </span>
                      )}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">{rest.cuisine}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-amber-500" /> {rest.location}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300">
                    <strong>Specialties:</strong> {rest.specialty}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedRestaurant(rest.name);
                    setStep(2);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    selectedRestaurant === rest.name
                      ? 'bg-amber-500 text-white shadow-glow'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-amber-500 hover:text-white'
                  }`}
                >
                  Select & Continue to Table Booking <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: TABLE BOOKING & GUEST DETAILS */}
      {step === 2 && (
        <form onSubmit={handleStep2Submit} className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800 shadow-xl">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Step 2: Table & Guest Booking Details
              </h2>
              <p className="text-xs text-slate-500">
                Selected Outlet: <strong className="text-amber-500">{selectedRestaurant}</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Change Restaurant
            </button>
          </div>

          {/* Guest Contact Details */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" />
              Guest Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Sourajit Santra"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="sourajit@example.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Party Size & Date */}
          <div className="space-y-4 pt-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-500" />
              Table Booking Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Party Size (Number of Guests)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPartySize(Math.max(1, partySize - 1))}
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                  >
                    -
                  </button>
                  <span className="text-lg font-extrabold text-amber-500 w-12 text-center">
                    {partySize}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPartySize(Math.min(20, partySize + 1))}
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Reservation Date *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Available Time Slot *
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                      timeSlot === slot
                        ? 'bg-amber-500 text-white shadow-glow'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Preference */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Seating Atmosphere Preference
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Standard', 'Window', 'Outdoor Patio', 'Private Booth'].map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setSeatingPreference(pref)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      seatingPreference === pref
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Special Requests (Dietary requirements, celebrations, etc.)
            </label>
            <textarea
              rows={2}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="e.g. Quiet table for business dinner, high chair needed..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Back to Restaurants
            </button>

            <button
              type="submit"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-glow flex items-center gap-2"
            >
              Next: Pre-Order Food Dishes <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: PRE-ORDER FOOD DISHES */}
      {step === 3 && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Utensils className="w-5 h-5 text-amber-500" />
                Step 3: Pre-Order Dishes for {selectedRestaurant} (Optional)
              </h2>
              <p className="text-xs text-slate-500">
                Pre-ordered dishes will be prepared fresh and served promptly upon your table arrival.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Table Details
            </button>
          </div>

          {/* Pre-Order Cart Total Banner */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-amber-800 dark:text-amber-300">
                Pre-Ordered Items Selected: <span className="text-sm text-amber-500">{Object.keys(preOrderCart).length} Dishes</span>
              </p>
              <p className="text-[11px] text-slate-500">
                You can add or skip pre-ordering at any time before confirming.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase text-slate-400 block font-semibold">Total Bill</span>
              <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                ₹{calculatePreOrderTotal().toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* MEAL PREFERENCE & COURSE FILTER SECTION */}
          <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4.5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
                <Utensils className="w-4 h-4 text-amber-500" />
                Select Meal Preference & Course:
              </span>

              {/* Dietary Filter Buttons */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto text-xs font-semibold shadow-xs">
                <button
                  type="button"
                  onClick={() => setPreOrderDietFilter('All')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    preOrderDietFilter === 'All'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setPreOrderDietFilter('Veg')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    preOrderDietFilter === 'Veg'
                      ? 'bg-emerald-500 text-white font-bold shadow-xs'
                      : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10'
                  }`}
                >
                  <Leaf className="w-3.5 h-3.5" /> Veg
                </button>
                <button
                  type="button"
                  onClick={() => setPreOrderDietFilter('NonVeg')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    preOrderDietFilter === 'NonVeg'
                      ? 'bg-rose-500 text-white font-bold shadow-xs'
                      : 'text-rose-600 dark:text-rose-400 hover:bg-rose-500/10'
                  }`}
                >
                  🍖 Non-Veg
                </button>
              </div>
            </div>

            {/* Meal Type Tabs: Breakfast, Starters, Lunch, Dinner, Sweets */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { label: 'All Courses', value: 'All', icon: <Utensils className="w-3.5 h-3.5 text-amber-500" /> },
                { label: 'Breakfast', value: 'Breakfast', icon: <Sunrise className="w-3.5 h-3.5 text-amber-500" /> },
                { label: 'Starters', value: 'Starters', icon: <Flame className="w-3.5 h-3.5 text-emerald-500" /> },
                { label: 'Lunch', value: 'Lunch', icon: <Sun className="w-3.5 h-3.5 text-amber-500" /> },
                { label: 'Dinner', value: 'Dinner', icon: <Moon className="w-3.5 h-3.5 text-purple-400" /> },
                { label: 'Sweets & Drinks', value: 'Beverages & Sweets', icon: <Sparkles className="w-3.5 h-3.5 text-rose-400" /> },
              ].map((tab) => {
                const count = restaurantMenu.filter((item) => {
                  if (tab.value === 'Starters') return item.mealType === 'Starters' || item.category === 'Starters';
                  if (tab.value === 'Beverages & Sweets') return item.mealType === 'Beverages & Sweets' || item.category === 'Beverages' || item.category === 'Desserts';
                  if (tab.value !== 'All' && item.mealType !== tab.value) return false;
                  return true;
                }).length;

                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setPreOrderMealFilter(tab.value)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                      preOrderMealFilter === tab.value
                        ? 'bg-amber-500 text-white shadow-glow'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                        preOrderMealFilter === tab.value
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Restaurant Menu Grid for Pre-ordering */}
          {menuLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
              ))}
            </div>
          ) : restaurantMenu.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No pre-order menu items available for this restaurant outlet right now.
            </div>
          ) : (
            (() => {
              const filteredList = restaurantMenu.filter((item) => {
                if (preOrderMealFilter !== 'All') {
                  if (preOrderMealFilter === 'Starters') {
                    if (item.mealType !== 'Starters' && item.category !== 'Starters') return false;
                  } else if (preOrderMealFilter === 'Beverages & Sweets') {
                    if (item.mealType !== 'Beverages & Sweets' && item.category !== 'Beverages' && item.category !== 'Desserts') return false;
                  } else if (item.mealType !== preOrderMealFilter) {
                    return false;
                  }
                }
                if (preOrderDietFilter === 'Veg' && !item.isVegetarian) return false;
                if (preOrderDietFilter === 'NonVeg' && item.isVegetarian) return false;
                return true;
              });

              if (filteredList.length === 0) {
                return (
                  <div className="text-center py-10 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-2">
                    <Utensils className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      No items match your selected meal preference ({preOrderMealFilter} {preOrderDietFilter !== 'All' ? `- ${preOrderDietFilter}` : ''}).
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setPreOrderMealFilter('All');
                        setPreOrderDietFilter('All');
                      }}
                      className="text-xs text-amber-500 hover:underline font-semibold"
                    >
                      Reset Meal Preference Filters
                    </button>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredList.map((item) => {
                    const qty = preOrderCart[item._id] || 0;
                    return (
                      <div
                        key={item._id}
                        className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 shadow-xs ${
                          qty > 0
                            ? 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/50 shadow-amber-500/10'
                            : 'bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-16 h-16 rounded-xl object-cover"
                            />
                            <span
                              className={`absolute -top-1 -left-1 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase text-white shadow-xs ${
                                item.isVegetarian ? 'bg-emerald-600' : 'bg-rose-600'
                              }`}
                            >
                              {item.isVegetarian ? 'Veg' : 'Non-Veg'}
                            </span>
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300">
                                {item.mealType || item.category}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
                              ₹{Number(item.price).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
                          <button
                            type="button"
                            onClick={() => updatePreOrderQuantity(item._id, -1)}
                            className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-bold text-xs text-slate-900 dark:text-white">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updatePreOrderQuantity(item._id, 1)}
                            className="w-7 h-7 rounded-lg bg-amber-500 font-bold text-white flex items-center justify-center hover:bg-amber-600 transition-all shadow-glow"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()
          )}

          {/* Bottom Action Bar */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Back to Table Details
            </button>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={loading}
                className="flex-1 sm:flex-none px-5 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Skip Pre-Order & Confirm Table
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={loading}
                className="flex-1 sm:flex-none px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-glow flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {loading ? 'Confirming Reservation...' : 'Confirm Table & Pre-Orders'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: CONFIRMATION RECEIPT */}
      {step === 4 && successBooking && (
        <div className="glass-card rounded-3xl p-8 border border-emerald-500/30 text-center space-y-6 animate-fade-in shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Table Reservation & Pre-Orders Confirmed!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              We look forward to hosting you at <strong className="text-amber-500">{successBooking.restaurantName}</strong>.
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800/60 p-6 rounded-2xl max-w-lg mx-auto text-left space-y-3 text-sm">
            <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
              <span className="text-slate-500">Restaurant Outlet:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{successBooking.restaurantName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Booking Reference:</span>
              <span className="font-mono font-bold text-amber-500">{successBooking._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Guest Name:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{successBooking.guestName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date & Time:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{successBooking.reservationDate} at {successBooking.timeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Party Size & Seating:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{successBooking.partySize} Guests ({successBooking.seatingPreference})</span>
            </div>

            {/* Pre-ordered items breakdown */}
            {Array.isArray(successBooking.preOrderedItems) && successBooking.preOrderedItems.length > 0 && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Pre-Ordered Dishes:</p>
                {successBooking.preOrderedItems.map((pi, i) => (
                  <div key={i} className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                    <span>{pi.name} x{pi.quantity}</span>
                    <span className="font-semibold">₹{(pi.price * pi.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs font-extrabold text-amber-500 pt-1">
                  <span>Total Bill Amount:</span>
                  <span>₹{Number(successBooking.totalAmount || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setSuccessBooking(null);
                setStep(1);
                setPreOrderCart({});
              }}
              className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Book Another Table
            </button>
            <Link
              to="/my-bookings"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold shadow-glow"
            >
              View My Bookings
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};
