import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Calendar, User, LogOut, ShieldCheck, Menu as MenuIcon, X, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const { user, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-200/50 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 dark:from-amber-500 dark:to-emerald-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-all duration-300">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-slate-900 via-amber-700 to-slate-800 dark:from-white dark:via-amber-300 dark:to-emerald-400 bg-clip-text text-transparent">
              DineEase
            </span>
            <span className="block text-[10px] uppercase font-semibold tracking-widest text-slate-500 dark:text-slate-400">
              Café & Dining
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300 text-sm">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg transition-all ${
              isActive('/')
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className={`px-4 py-2 rounded-lg transition-all ${
              isActive('/menu')
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Menu Catalog
          </Link>
          <Link
            to="/reservations"
            className={`px-4 py-2 rounded-lg transition-all ${
              isActive('/reservations')
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Reserve Table
          </Link>

          {user && user.role === 'customer' && (
            <Link
              to="/my-bookings"
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive('/my-bookings')
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              My Bookings
            </Link>
          )}

          {user && (user.role === 'admin' || user.role === 'staff') && (
            <Link
              to="/admin"
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                isActive('/admin')
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/30'
                  : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Management Desk
            </Link>
          )}
        </nav>

        {/* Right Actions: Theme Toggle + Auth Status */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                  {user.name}
                </p>
                <span className="inline-block text-[11px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  {user.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-200"
                title="Log Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="px-4.5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-glow hover:shadow-lg transition-all duration-200 flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                Register
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-amber-500/10 font-medium"
          >
            Home
          </Link>
          <Link
            to="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-amber-500/10 font-medium"
          >
            Menu Catalog
          </Link>
          <Link
            to="/reservations"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-amber-500/10 font-medium"
          >
            Reserve Table
          </Link>
          {user && user.role === 'customer' && (
            <Link
              to="/my-bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-amber-500/10 font-medium"
            >
              My Bookings
            </Link>
          )}
          {user && (user.role === 'admin' || user.role === 'staff') && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-500/10"
            >
              Management Desk
            </Link>
          )}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            {user ? (
              <div className="space-y-3">
                <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/60 rounded-xl">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email} ({user.role})</p>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 font-medium flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    openAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center font-medium rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    openAuthModal('register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center font-semibold rounded-xl bg-amber-500 text-white shadow-glow"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
