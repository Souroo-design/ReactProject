import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },
    restaurantName: {
      type: String,
      required: [true, 'Restaurant name is required'],
      default: 'Bukhara Royal Grill',
    },
    mealType: {
      type: String,
      required: [true, 'Meal type is required'],
      enum: ['Breakfast', 'Starters', 'Lunch', 'Snacks', 'Dinner', 'Beverages & Sweets'],
      default: 'Lunch',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Starters', 'Main Course', 'Desserts', 'Beverages', 'Chef Specials'],
      default: 'Main Course',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isVegetarian: {
      type: Boolean,
      default: false,
    },
    isGlutenFree: {
      type: Boolean,
      default: false,
    },
    spicyLevel: {
      type: Number,
      default: 0, // 0: mild, 1: medium, 2: hot, 3: extra hot
      min: 0,
      max: 3,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    imageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    },
    preparationTimeMinutes: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  }
);

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
