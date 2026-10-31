import React from 'react';
import { Leaf, Flame, Clock, ToggleLeft, ToggleRight, Edit3, Trash2, Check, X, Store, Sun, Sunrise, Sunset, Moon, Star, Utensils } from 'lucide-react';

export const MenuItemCard = ({
  item,
  isAdminView = false,
  onToggleAvailability,
  onEdit,
  onDelete,
}) => {
  const {
    _id,
    name,
    restaurantName,
    mealType,
    description,
    price,
    category,
    isAvailable,
    isVegetarian,
    isGlutenFree,
    spicyLevel,
    rating,
    imageUrl,
    preparationTimeMinutes,
  } = item;

  const mealIcons = {
    Breakfast: <Sunrise className="w-3 h-3 text-amber-500" />,
    Starters: <Utensils className="w-3 h-3 text-emerald-500" />,
    Lunch: <Sun className="w-3 h-3 text-amber-500" />,
    Dinner: <Moon className="w-3 h-3 text-purple-400" />,
    'Beverages & Sweets': <Flame className="w-3 h-3 text-rose-400" />,
  };

  return (
    <div
      className={`group relative rounded-3xl overflow-hidden glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
        !isAvailable && !isAdminView ? 'opacity-65 grayscale-[30%]' : ''
      }`}
    >
      <div>
        {/* Card Header Image */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-800">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {mealType && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-amber-400 border border-amber-500/30 flex items-center gap-1">
                {mealIcons[mealType] || <Utensils className="w-3 h-3 text-amber-400" />}
                {mealType}
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            {isAvailable ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/90 text-white backdrop-blur-md flex items-center gap-1 shadow-md">
                <Check className="w-3 h-3" /> Available
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-600/90 text-white backdrop-blur-md flex items-center gap-1 shadow-md">
                <X className="w-3 h-3" /> Sold Out
              </span>
            )}
          </div>

          {/* Preparation Time Tag */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-medium text-slate-200 bg-slate-900/60 backdrop-blur-sm px-2.5 py-0.5 rounded-lg">
            <Clock className="w-3 h-3 text-amber-400" />
            {preparationTimeMinutes || 15} mins
          </div>

          {/* Rating Badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-bold text-amber-300 bg-slate-900/70 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-amber-500/30">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            {rating || 4.8}
          </div>
        </div>

        {/* Card Body Content */}
        <div className="p-5 space-y-2">
          
          {/* Restaurant Banner Tag */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl w-max border border-emerald-500/20">
            <Store className="w-3.5 h-3.5" />
            {restaurantName || 'Bukhara Royal Grill'}
          </div>

          <div className="flex items-start justify-between gap-2 pt-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {name}
            </h3>
            <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400 whitespace-nowrap">
              ₹{Number(price).toLocaleString('en-IN')}
            </span>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Dietary & Spicy Badges */}
          <div className="flex items-center gap-2 text-xs flex-wrap pt-1">
            {isVegetarian && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                <Leaf className="w-3 h-3" /> Veg
              </span>
            )}
            {isGlutenFree && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                Gluten-Free
              </span>
            )}
            {spicyLevel > 0 && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium">
                {Array.from({ length: spicyLevel }).map((_, idx) => (
                  <Flame key={idx} className="w-3 h-3 text-rose-500 fill-rose-500" />
                ))}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Admin Action Bar */}
      {isAdminView && (
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between gap-2 rounded-b-3xl">
          <button
            onClick={() => onToggleAvailability && onToggleAvailability(_id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isAvailable
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20'
            }`}
          >
            {isAvailable ? <ToggleRight className="w-4 h-4 text-emerald-500" /> : <ToggleLeft className="w-4 h-4 text-rose-500" />}
            {isAvailable ? 'Available' : 'Unavailable'}
          </button>

          <div className="flex items-center gap-1.5">
            {onEdit && (
              <button
                onClick={() => onEdit(item)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                title="Edit Item"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(_id)}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-500/10 transition-all"
                title="Delete Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
