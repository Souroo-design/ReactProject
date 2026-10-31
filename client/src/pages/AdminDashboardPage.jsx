import React, { useState, useEffect } from 'react';
import { ShieldCheck, Utensils, Calendar, PlusCircle, RefreshCw, Filter, Search } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { MenuItemCard } from '../components/MenuItemCard';
import { ReservationCard } from '../components/ReservationCard';
import { AdminMenuModal } from '../components/AdminMenuModal';
import { useAuth } from '../context/AuthContext';

export const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'reservations'

  // Menu State
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Reservation State
  const [reservations, setReservations] = useState([]);
  const [reservationLoading, setReservationLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchMenu = async () => {
    setMenuLoading(true);
    try {
      const { data } = await axiosInstance.get('/menu');
      if (data.success) {
        setMenuItems(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    } finally {
      setMenuLoading(false);
    }
  };

  const fetchReservations = async () => {
    setReservationLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;

      const { data } = await axiosInstance.get('/reservations', { params });
      if (data.success) {
        setReservations(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch reservations:', err);
    } finally {
      setReservationLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'menu') {
      fetchMenu();
    } else {
      fetchReservations();
    }
  }, [activeTab, statusFilter]);

  // Menu Handlers
  const handleToggleAvailability = async (id) => {
    try {
      const { data } = await axiosInstance.patch(`/menu/${id}/toggle`);
      if (data.success) {
        fetchMenu();
      }
    } catch (err) {
      console.error('Failed to toggle availability:', err);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    try {
      const { data } = await axiosInstance.delete(`/menu/${id}`);
      if (data.success) {
        fetchMenu();
      }
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const handleSaveMenuItem = async (formData) => {
    try {
      if (editingItem) {
        await axiosInstance.put(`/menu/${editingItem._id}`, formData);
      } else {
        await axiosInstance.post('/menu', formData);
      }
      setIsMenuModalOpen(false);
      setEditingItem(null);
      fetchMenu();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save menu item');
    }
  };

  // Reservation Handlers
  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      const { data } = await axiosInstance.patch(`/reservations/${reservationId}/status`, {
        status: newStatus,
      });
      if (data.success) {
        fetchReservations();
      }
    } catch (err) {
      console.error('Failed to update reservation status:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            {user?.role} Portal
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Staff & Management Desk
          </h1>
        </div>

        {/* Tab switch buttons */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'menu'
                ? 'bg-amber-500 text-white shadow-glow'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Utensils className="w-4 h-4" />
            Menu Catalog Desk
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'reservations'
                ? 'bg-emerald-500 text-white shadow-emerald-glow'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Reservation Desk
          </button>
        </div>
      </div>

      {/* TAB 1: MENU MANAGEMENT */}
      {activeTab === 'menu' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Menu Item Catalog
              </h2>
              <p className="text-xs text-slate-500">
                Manage availability, prices, descriptions, and add new dishes to the live menu.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingItem(null);
                setIsMenuModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold shadow-glow flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Add New Menu Item
            </button>
          </div>

          {menuLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-80 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <MenuItemCard
                  key={item._id}
                  item={item}
                  isAdminView={true}
                  onToggleAvailability={handleToggleAvailability}
                  onEdit={(targetItem) => {
                    setEditingItem(targetItem);
                    setIsMenuModalOpen(true);
                  }}
                  onDelete={user?.role === 'admin' ? handleDeleteItem : null}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: RESERVATIONS DESK */}
      {activeTab === 'reservations' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Table Reservations Desk
              </h2>
              <p className="text-xs text-slate-500">
                View incoming guest bookings and update seating status in real-time.
              </p>
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {['all', 'pending', 'confirmed', 'seated', 'completed', 'cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all capitalize ${
                    statusFilter === st
                      ? 'bg-emerald-500 text-white shadow-emerald-glow'
                      : 'glass-card text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {reservationLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-44 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
              ))}
            </div>
          ) : reservations.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center max-w-md mx-auto space-y-3">
              <Calendar className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No reservations found</h3>
              <p className="text-xs text-slate-500">
                There are no bookings matching the selected status filter (<span className="uppercase font-mono">{statusFilter}</span>).
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map((resItem) => (
                <ReservationCard
                  key={resItem._id}
                  reservation={resItem}
                  isStaffView={true}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Admin Menu Modal */}
      <AdminMenuModal
        isOpen={isMenuModalOpen}
        onClose={() => {
          setIsMenuModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveMenuItem}
        editingItem={editingItem}
      />

    </div>
  );
};
