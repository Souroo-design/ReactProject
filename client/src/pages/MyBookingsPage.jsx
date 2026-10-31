import React, { useEffect, useState } from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { ReservationCard } from '../components/ReservationCard';

export const MyBookingsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyReservations = async () => {
      try {
        let localIds = [];
        try {
          localIds = JSON.parse(localStorage.getItem('dineease_saved_ids') || '[]');
        } catch (e) {
          localIds = [];
        }

        const params = {};
        if (localIds.length > 0) {
          params.extraIds = localIds.join(',');
        }

        const { data } = await axiosInstance.get('/reservations/my', { params });
        if (data.success) {
          setReservations(data.data);
        }
      } catch (err) {
        console.error('Failed to load my reservations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyReservations();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          My Table Bookings
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          View status and details of your active and past dining reservations.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-44 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : reservations.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center max-w-md mx-auto space-y-3">
          <Calendar className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No bookings found</h3>
          <p className="text-xs text-slate-500">
            You don't have any table reservations registered yet. Book a table to see your reservation status here!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((resItem) => (
            <ReservationCard key={resItem._id} reservation={resItem} />
          ))}
        </div>
      )}

    </div>
  );
};
