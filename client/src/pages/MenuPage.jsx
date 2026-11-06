import React, { useState, useEffect } from 'react';
import {
  Search, Leaf, Check, Sparkles, UtensilsCrossed, Store,
  Sunrise, Sun, Moon, Utensils, Flame, ArrowLeft, ShoppingCart,
  MapPin, Star, ArrowRight, Plus, Minus, X, CalendarCheck, Coffee,
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

// ─── Restaurant data (mirrors ReservationPage) ────────────────────────────────
const RESTAURANTS = [
  {
    id: 'Bukhara Royal Grill',
    name: 'Bukhara Royal Grill',
    cuisine: 'North Indian Tandoor & Royal Mughlai',
    location: 'Connaught Place, New Delhi',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    specialty: 'Dal Bukhara, Galouti Kebabs & Tandoori Malai Tikka',
    color: 'from-amber-600 to-orange-600',
  },
  {
    id: 'Punjab Dhaba & Rasoi',
    name: 'Punjab Dhaba & Rasoi',
    cuisine: 'Punjabi Dhaba & Clay Oven Delicacies',
    location: 'Grand Trunk Road, Punjab',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    specialty: 'Chole Bhature, Old Delhi Butter Chicken & Sarson Saag',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'Dakshin South Tiffin Room',
    name: 'Dakshin South Tiffin Room',
    cuisine: 'Traditional South Indian & Chettinad',
    location: 'Indiranagar, Bengaluru',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
    specialty: 'Mysore Masala Dosa, Medu Vada & Chettinad Curry',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'Hyderabadi Shahi Kitchen',
    name: 'Hyderabadi Shahi Kitchen',
    cuisine: 'Nizami Dum Biryani & Kebabs',
    location: 'Banjara Hills, Hyderabad',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    specialty: 'Hyderabadi Dum Chicken Biryani & Nizam Chicken 65',
    color: 'from-purple-600 to-indigo-600',
  },
];

const MEAL_TABS = [
  { label: 'All',        value: 'All',               icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
  { label: 'Breakfast',  value: 'Breakfast',          icon: <Sunrise className="w-3.5 h-3.5 text-amber-500" /> },
  { label: 'Starters',   value: 'Starters',           icon: <Utensils className="w-3.5 h-3.5 text-emerald-500" /> },
  { label: 'Lunch',      value: 'Lunch',              icon: <Sun className="w-3.5 h-3.5 text-amber-500" /> },
  { label: 'Snacks',     value: 'Snacks',             icon: <Coffee className="w-3.5 h-3.5 text-orange-500" /> },
  { label: 'Dinner',     value: 'Dinner',             icon: <Moon className="w-3.5 h-3.5 text-purple-400" /> },
  { label: 'Sweets & Drinks', value: 'Beverages & Sweets', icon: <Flame className="w-3.5 h-3.5 text-rose-400" /> },
];

const SEATING_OPTIONS = ['Standard', 'Window', 'Outdoor Patio', 'Private Booth'];

// ─── Spicy flame helper ────────────────────────────────────────────────────────
const SpicyFlames = ({ level }) =>
  level > 0 ? (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: level }).map((_, i) => (
        <Flame key={i} className="w-3 h-3 text-rose-500 fill-rose-500" />
      ))}
    </span>
  ) : null;

// ─── Main component ────────────────────────────────────────────────────────────
export const MenuPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL-driven active restaurant (supports browser back/forward and direct linking)
  const currentRestParam = searchParams.get('restaurant');
  const activeRestaurant = currentRestParam
    ? RESTAURANTS.find(
        (r) =>
          r.name.toLowerCase() === currentRestParam.toLowerCase() ||
          r.id.toLowerCase() === currentRestParam.toLowerCase()
      ) || null
    : null;

  /* menu state */
  const [menuItems, setMenuItems]   = useState([]);
  const [loading, setLoading]       = useState(false);
  const [activeMeal, setActiveMeal] = useState('All');
  const [search, setSearch]         = useState('');
  const [vegOnly, setVegOnly]       = useState(false);

  /* table preference state */
  const [seatingPreference, setSeatingPreference] = useState('Standard');

  /* cart: { [itemId]: quantity } */
  const [cart, setCart] = useState({});

  // ── fetch when entering menu view for an active restaurant ─────────────────
  useEffect(() => {
    if (activeRestaurant) {
      setLoading(true);
      setMenuItems([]);
      axiosInstance
        .get('/menu', { params: { restaurantName: activeRestaurant.name } })
        .then(({ data }) => { if (data.success) setMenuItems(data.data); })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [currentRestParam]);

  // ── cart helpers ───────────────────────────────────────────────────────────
  const updateQty = (id, delta) =>
    setCart((prev) => {
      const next = { ...prev };
      const qty  = (next[id] || 0) + delta;
      if (qty <= 0) delete next[id]; else next[id] = qty;
      return next;
    });

  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);
  const cartTotal = Object.entries(cart).reduce((s, [id, qty]) => {
    const item = menuItems.find((m) => m._id === id);
    return s + (item?.price || 0) * qty;
  }, 0);

  // ── filter displayed items ─────────────────────────────────────────────────
  const filtered = menuItems.filter((item) => {
    if (activeMeal !== 'All') {
      if (activeMeal === 'Starters' && item.mealType !== 'Starters' && item.category !== 'Starters') return false;
      if (activeMeal === 'Beverages & Sweets' && item.mealType !== 'Beverages & Sweets' && item.category !== 'Beverages' && item.category !== 'Desserts') return false;
      if (!['Starters', 'Beverages & Sweets'].includes(activeMeal) && item.mealType !== activeMeal) return false;
    }
    if (vegOnly && !item.isVegetarian) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!item.name.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // ── navigate to reservation with pre-selected items + table preference ────
  const handleBookTable = () => {
    const preSelectedItems = Object.entries(cart).map(([id, qty]) => {
      const item = menuItems.find((m) => m._id === id);
      return { menuItemId: id, name: item?.name || '', price: item?.price || 0, quantity: qty };
    });
    navigate('/reservations', {
      state: {
        restaurantName:   activeRestaurant.name,
        seatingPreference,
        preSelectedItems,
        totalAmount:      cartTotal,
      },
    });
  };

  // ── open a restaurant via URL ─────────────────────────────────────────────
  const openRestaurant = (rest) => {
    setSearchParams({ restaurant: rest.name });
    setCart({});
    setActiveMeal('All');
    setSearch('');
    setVegOnly(false);
  };

  // ── close restaurant and return to gallery via URL ─────────────────────────
  const closeRestaurant = () => {
    setSearchParams({});
    setCart({});
  };

  // ═══════════════════════════════════════════════════════════════════════════
  //  VIEW A — Restaurant Cards (when no restaurant param in URL)
  // ═══════════════════════════════════════════════════════════════════════════
  if (!activeRestaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            <Store className="w-3.5 h-3.5 text-amber-500" />
            Authentic Indian Dining Outlets
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Explore Our Restaurants
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Pick a restaurant to browse its full menu — Breakfast, Starters, Lunch, Snacks, Dinner & Sweets. Select dishes and reserve your table preference!
          </p>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {RESTAURANTS.map((rest) => (
            <div
              key={rest.id}
              className="group relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white dark:bg-slate-900 flex flex-col"
              onClick={() => openRestaurant(rest)}
            >
              {/* Cover image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                {/* Rating badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 text-xs font-bold text-amber-300 bg-slate-900/80 px-2.5 py-1 rounded-xl border border-amber-500/30">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {rest.rating}
                </div>

                {/* Cuisine tag on image bottom */}
                <div className="absolute bottom-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${rest.color} shadow-md`}>
                    {rest.cuisine}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col gap-3 flex-grow">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {rest.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    {rest.location}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-slate-800 dark:text-slate-100">Chef's Picks: </span>
                  {rest.specialty}
                </div>

                {/* Meal-type pills preview */}
                <div className="flex flex-wrap gap-1.5">
                  {['Breakfast', 'Starters', 'Lunch', 'Snacks', 'Dinner', 'Sweets'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[11px] font-semibold border border-amber-500/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className={`mt-auto w-full py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r ${rest.color} hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md group-hover:shadow-lg`}
                >
                  <Utensils className="w-4 h-4" />
                  Explore Menu & Book Table
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  VIEW B — Restaurant Menu (inside a restaurant)
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Top bar: back + restaurant name */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={closeRestaurant}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> All Restaurants
          </button>

          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {activeRestaurant.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-500" />{activeRestaurant.location}
            </p>
          </div>
        </div>

        {/* Cart / Book Table CTA */}
        <button
          onClick={handleBookTable}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white shadow-lg transition-all ${
            cartCount > 0
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-500/30'
              : 'bg-slate-700 dark:bg-slate-600 hover:bg-slate-800 dark:hover:bg-slate-500'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          {cartCount > 0
            ? `Book Table (${seatingPreference}) · ${cartCount} dish${cartCount > 1 ? 'es' : ''} · ₹${cartTotal.toLocaleString('en-IN')}`
            : `Book Table (${seatingPreference})`}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── Table Seating Preference Selector ── */}
      <div className="bg-slate-50 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="space-y-0.5">
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Select Your Table Preference:
          </span>
          <p className="text-[11px] text-slate-500">Pick your desired atmosphere at {activeRestaurant.name}.</p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {SEATING_OPTIONS.map((pref) => (
            <button
              key={pref}
              type="button"
              onClick={() => setSeatingPreference(pref)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                seatingPreference === pref
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-emerald-glow font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {pref}
            </button>
          ))}
        </div>
      </div>

      {/* ── Meal-type tabs: Breakfast, Starters, Lunch, Snacks, Dinner, Sweets ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {MEAL_TABS.map((tab) => {
          const count = menuItems.filter((item) => {
            if (tab.value === 'All') return true;
            if (tab.value === 'Starters') return item.mealType === 'Starters' || item.category === 'Starters';
            if (tab.value === 'Beverages & Sweets') return item.mealType === 'Beverages & Sweets' || item.category === 'Beverages' || item.category === 'Desserts';
            return item.mealType === tab.value;
          }).length;

          return (
            <button
              key={tab.value}
              onClick={() => setActiveMeal(tab.value)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                activeMeal === tab.value
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.icon}
              {tab.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                activeMeal === tab.value ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Search + Veg filter ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes…"
            className="w-full pl-10 pr-4 py-3 text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={(e) => setVegOnly(e.target.checked)}
            className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500"
          />
          <Leaf className="w-3.5 h-3.5 text-emerald-500" />
          Pure Veg Only
        </label>
      </div>

      {/* ── Cart summary strip (visible when items selected) ── */}
      {cartCount > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
              {cartCount} item{cartCount > 1 ? 's' : ''} selected &nbsp;·&nbsp; ₹{cartTotal.toLocaleString('en-IN')} pre-order total &nbsp;·&nbsp; {seatingPreference} Table
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setCart({})} className="text-xs text-slate-500 hover:text-rose-500 font-semibold flex items-center gap-1 transition-colors">
              <X className="w-3.5 h-3.5" /> Clear
            </button>
            <button
              onClick={handleBookTable}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <CalendarCheck className="w-3.5 h-3.5" /> Book Table
            </button>
          </div>
        </div>
      )}

      {/* ── Food Items Grid ── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-80 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 glass-card rounded-3xl max-w-md mx-auto space-y-3">
          <UtensilsCrossed className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No dishes found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Try a different meal type or clear the search.</p>
          <button onClick={() => { setActiveMeal('All'); setSearch(''); setVegOnly(false); }}
            className="text-xs text-amber-500 hover:underline font-semibold">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const qty = cart[item._id] || 0;
            return (
              <div
                key={item._id}
                className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col ${
                  qty > 0
                    ? 'border-amber-500 ring-2 ring-amber-500/30 shadow-amber-500/10 shadow-lg'
                    : 'border-slate-200 dark:border-slate-800 glass-card'
                } ${!item.isAvailable ? 'opacity-60 grayscale-[30%]' : ''}`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-800">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Meal type badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      {MEAL_TABS.find((t) => t.value === item.mealType)?.icon}
                      {item.mealType}
                    </span>
                  </div>

                  {/* Available / Sold-out */}
                  <div className="absolute top-3 right-3">
                    {item.isAvailable ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/90 text-white backdrop-blur-md flex items-center gap-1 shadow-md">
                        <Check className="w-3 h-3" /> Available
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-600/90 text-white backdrop-blur-md flex items-center gap-1 shadow-md">
                        <X className="w-3 h-3" /> Sold Out
                      </span>
                    )}
                  </div>

                  {/* Prep time + rating */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-medium text-slate-200 bg-slate-900/60 backdrop-blur-sm px-2.5 py-0.5 rounded-lg">
                    <Sparkles className="w-3 h-3 text-amber-400" />{item.preparationTimeMinutes || 15} mins
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-bold text-amber-300 bg-slate-900/70 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-amber-500/30">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />{item.rating || 4.8}
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-2 flex-grow flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-lg font-extrabold text-amber-600 dark:text-amber-400 whitespace-nowrap shrink-0">
                      ₹{Number(item.price).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 leading-relaxed flex-grow">
                    {item.description}
                  </p>

                  {/* Dietary badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.isVegetarian ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                        <Leaf className="w-3 h-3" /> Veg
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[11px] font-semibold">
                        🍖 Non-Veg
                      </span>
                    )}
                    {item.isGlutenFree && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-semibold">
                        Gluten-Free
                      </span>
                    )}
                    <SpicyFlames level={item.spicyLevel} />
                  </div>

                  {/* ── Quantity controls ── */}
                  {item.isAvailable ? (
                    <div className="mt-auto pt-2">
                      {qty === 0 ? (
                        <button
                          onClick={() => updateQty(item._id, 1)}
                          className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all"
                        >
                          <Plus className="w-4 h-4" /> Add to Table Order
                        </button>
                      ) : (
                        <div className="flex items-center justify-between gap-3 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1.5">
                          <button
                            onClick={() => updateQty(item._id, -1)}
                            className="w-9 h-9 rounded-xl bg-white dark:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="text-center">
                            <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">{qty}</span>
                            <span className="text-[10px] text-slate-500 ml-1">added</span>
                          </div>
                          <button
                            onClick={() => updateQty(item._id, 1)}
                            className="w-9 h-9 rounded-xl bg-amber-500 font-bold text-white flex items-center justify-center hover:bg-amber-600 transition-all shadow-sm"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-auto pt-2">
                      <div className="w-full py-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-500 text-xs font-bold text-center">
                        Currently Unavailable
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Bottom sticky Book Table bar ── */}
      {cartCount > 0 && (
        <div className="sticky bottom-4 z-30">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleBookTable}
              className="w-full py-4 rounded-3xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-sm shadow-2xl shadow-amber-500/40 flex items-center justify-between px-6 transition-all"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span>{cartCount} dish{cartCount > 1 ? 'es' : ''} selected ({seatingPreference} Table)</span>
              </div>
              <div className="flex items-center gap-2">
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                <span className="font-bold">· Book Table</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
