import React, { useState, useEffect } from 'react';
import { Search, Leaf, Check, Sparkles, UtensilsCrossed, Store, Sunrise, Sun, Moon, Utensils, Flame } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { MenuItemCard } from '../components/MenuItemCard';

export const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // New Multi-Restaurant & Meal Category Filters
  const [selectedRestaurant, setSelectedRestaurant] = useState('All');
  const [selectedMealType, setSelectedMealType] = useState('All');
  
  const [availableOnly, setAvailableOnly] = useState(false);
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [glutenFreeOnly, setGlutenFreeOnly] = useState(false);

  const indianRestaurants = [
    'All',
    'Bukhara Royal Grill',
    'Punjab Dhaba & Rasoi',
    'Dakshin South Tiffin Room',
    'Hyderabadi Shahi Kitchen',
  ];

  const mealTypes = [
    { label: 'All Meal Times', value: 'All', icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
    { label: 'Breakfast', value: 'Breakfast', icon: <Sunrise className="w-3.5 h-3.5 text-amber-500" /> },
    { label: 'Starters', value: 'Starters', icon: <Utensils className="w-3.5 h-3.5 text-emerald-500" /> },
    { label: 'Lunch', value: 'Lunch', icon: <Sun className="w-3.5 h-3.5 text-amber-500" /> },
    { label: 'Dinner', value: 'Dinner', icon: <Moon className="w-3.5 h-3.5 text-purple-400" /> },
    { label: 'Sweets & Beverages', value: 'Beverages & Sweets', icon: <Flame className="w-3.5 h-3.5 text-rose-400" /> },
  ];

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedRestaurant !== 'All') params.restaurantName = selectedRestaurant;
      if (selectedMealType !== 'All') params.mealType = selectedMealType;
      if (search.trim()) params.search = search.trim();
      if (availableOnly) params.availableOnly = 'true';
      if (vegetarianOnly) params.vegetarianOnly = 'true';
      if (glutenFreeOnly) params.glutenFreeOnly = 'true';

      const { data } = await axiosInstance.get('/menu', { params });
      if (data.success) {
        setMenuItems(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [selectedRestaurant, selectedMealType, availableOnly, vegetarianOnly, glutenFreeOnly]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMenu();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
          <Store className="w-3.5 h-3.5 text-amber-500" />
          Authentic Indian Dining Outlets
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Indian Restaurant & Food Catalog
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Explore iconic Indian restaurants offering Breakfast delicacies, Tandoori starters, Royal lunches, and Dinner specials.
        </p>
      </div>

      {/* Restaurant Selector Filter */}
      <div className="space-y-4">
        
        {/* Restaurant Outlet Tabs */}
        <div>
          <p className="text-center text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
            Select Indian Restaurant Outlet:
          </p>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {indianRestaurants.map((rest) => (
              <button
                key={rest}
                onClick={() => setSelectedRestaurant(rest)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  selectedRestaurant === rest
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-glow'
                    : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                {rest === 'All' ? 'All Restaurants' : rest}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Time Filters (Breakfast, Starters, Lunch, Dinner) */}
        <div>
          <p className="text-center text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
            Filter by Meal Time / Timing:
          </p>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {mealTypes.map((meal) => (
              <button
                key={meal.value}
                onClick={() => setSelectedMealType(meal.value)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  selectedMealType === meal.value
                    ? 'bg-amber-500 text-white shadow-glow'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {meal.icon}
                {meal.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto pt-2">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by food name, restaurant name, or ingredients..."
            className="w-full pl-12 pr-24 py-3.5 text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-2 top-3.5 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-sm transition-all"
          >
            Search
          </button>
        </form>

        {/* Dietary & Availability Checkboxes */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300 pt-1">
          <label className="flex items-center gap-2 cursor-pointer bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
            />
            Available Only
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
            <input
              type="checkbox"
              checked={vegetarianOnly}
              onChange={(e) => setVegetarianOnly(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500"
            />
            <Leaf className="w-3.5 h-3.5 text-emerald-500" />
            Pure Veg Only
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
            <input
              type="checkbox"
              checked={glutenFreeOnly}
              onChange={(e) => setGlutenFreeOnly(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
            />
            Gluten-Free
          </label>
        </div>
      </div>

      {/* Food Items Display Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-80 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : menuItems.length === 0 ? (
        <div className="text-center py-16 glass-card rounded-3xl max-w-md mx-auto space-y-3">
          <UtensilsCrossed className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No food items found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try selecting a different restaurant outlet or meal time filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <MenuItemCard key={item._id} item={item} />
          ))}
        </div>
      )}

    </div>
  );
};
