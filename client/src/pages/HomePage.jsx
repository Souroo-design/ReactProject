import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Calendar, Sparkles, ChefHat, Award, Clock, ArrowRight, Star } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { MenuItemCard } from '../components/MenuItemCard';

export const HomePage = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axiosInstance.get('/menu');
        if (data.success) {
          // Take first 3 items or chef specials
          setFeaturedItems(data.data.slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to load menu items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/15 dark:bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/20 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Royal Indian Culinary Experience
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white">
                Savor Royal Indian <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-500 bg-clip-text text-transparent">Flavors</span> & Authentic Spices
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Welcome to DineEase, where authentic clay-oven tandoori grills, rich royal curries, and aromatic dum biryanis meet modern dining hospitality. Browse our curated menu or reserve your preferred table.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/menu"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Utensils className="w-4 h-4" />
                  Explore Menu
                </Link>

                <Link
                  to="/reservations"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl glass-card text-slate-800 dark:text-white font-bold text-sm hover:bg-slate-200/60 dark:hover:bg-slate-800/80 transition-all flex items-center justify-center gap-2 border border-slate-300/80 dark:border-slate-700"
                >
                  <Calendar className="w-4 h-4 text-amber-500" />
                  Reserve a Table
                </Link>
              </div>

              {/* Stats highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 max-w-md mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white">4.9 ★</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">1,200+ Guest Reviews</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-amber-500">100%</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Fresh Ingredients</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-emerald-500">15m</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Avg Prep Time</p>
                </div>
              </div>
            </div>

            {/* Right Banner Image Stack */}
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                  alt="DineEase Restaurant Atmosphere"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Floating card */}
                <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-2xl border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500 text-white">
                      <ChefHat className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Chef's Tasting Menu</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300">Curated weekly by Executive Chef Alexandre</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-lg">
                    Featured
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-200/60 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <ChefHat className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Artisanal Flavors</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Every dish is crafted using organic produce, handpicked spices, and artisanal culinary techniques.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-200/60 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Instant Table Booking</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Select your party size, date, time slot, and seating preference with real-time availability confirmation.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-200/60 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Warm Hospitality</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Our dedicated staff ensures seamless service, whether for intimate date nights or corporate dinners.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Menu Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
              Popular Dishes
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Featured Menu Highlights
            </h2>
          </div>
          <Link
            to="/menu"
            className="text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 flex items-center gap-1 group"
          >
            View Full Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <MenuItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* Reservation CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-8 sm:p-12 text-white border border-amber-500/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready for an Unforgettable Dining Experience?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Reserve your table online now to guarantee seating for your preferred date and time slot.
            </p>
          </div>
          <Link
            to="/reservations"
            className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-glow whitespace-nowrap transition-transform hover:scale-105"
          >
            Book Your Table Now
          </Link>
        </div>
      </section>

    </div>
  );
};
