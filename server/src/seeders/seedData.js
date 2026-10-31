import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { MenuItem } from '../models/MenuItem.js';
import { Reservation } from '../models/Reservation.js';

dotenv.config();

const initialMenuItems = [
  // 1. Bukhara Royal Grill
  {
    restaurantName: 'Bukhara Royal Grill',
    mealType: 'Breakfast',
    name: 'Tandoori Aloo Paratha with White Butter',
    description: 'Crispy whole-wheat flatbread stuffed with spiced mashed potatoes, cooked in clay oven and served with fresh homemade white butter and curd.',
    price: 180,
    category: 'Starters',
    isAvailable: true,
    isVegetarian: true,
    isGlutenFree: false,
    spicyLevel: 1,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 15,
  },
  {
    restaurantName: 'Bukhara Royal Grill',
    mealType: 'Starters',
    name: 'Charcoal Murgh Malai Tikka',
    description: 'Boneless chicken morsels marinated in cashew paste, cream, cheese, and cardamom, grilled over glowing coals.',
    price: 380,
    category: 'Starters',
    isAvailable: true,
    isVegetarian: false,
    isGlutenFree: true,
    spicyLevel: 1,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 20,
  },
  {
    restaurantName: 'Bukhara Royal Grill',
    mealType: 'Lunch',
    name: 'Legendary Dal Bukhara & Garlic Naan',
    description: 'Whole black lentils slow-cooked overnight for 18 hours with tomatoes, ginger, garlic, and fresh cream. Served with leavened tandoori garlic naan.',
    price: 340,
    category: 'Main Course',
    isAvailable: true,
    isVegetarian: true,
    isGlutenFree: false,
    spicyLevel: 1,
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 15,
  },
  {
    restaurantName: 'Bukhara Royal Grill',
    mealType: 'Dinner',
    name: 'Awadhi Mutton Galouti Kebab',
    description: 'Melt-in-your-mouth minced lamb kebabs infused with 160 secret herbs and spices, served on saffron ulte taawa paratha.',
    price: 540,
    category: 'Chef Specials',
    isAvailable: true,
    isVegetarian: false,
    isGlutenFree: false,
    spicyLevel: 2,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 25,
  },

  // 2. Punjab Dhaba & Rasoi
  {
    restaurantName: 'Punjab Dhaba & Rasoi',
    mealType: 'Breakfast',
    name: 'Amritsari Chole Bhature Special',
    description: 'Puffy deep-fried sourdough breads served with spicy chickpeas gravy, pickled green chilies, and onion rings.',
    price: 160,
    category: 'Main Course',
    isAvailable: true,
    isVegetarian: true,
    isGlutenFree: false,
    spicyLevel: 2,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 15,
  },
  {
    restaurantName: 'Punjab Dhaba & Rasoi',
    mealType: 'Starters',
    name: 'Tandoori Paneer Tikka Grill',
    description: 'Fresh cottage cheese cubes and colorful bell peppers marinated in spiced yogurt and mustard oil, charred in clay oven.',
    price: 320,
    category: 'Starters',
    isAvailable: true,
    isVegetarian: true,
    isGlutenFree: true,
    spicyLevel: 2,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 18,
  },
  {
    restaurantName: 'Punjab Dhaba & Rasoi',
    mealType: 'Lunch',
    name: 'Old Delhi Butter Chicken (Murgh Makhani)',
    description: 'Tender tandoori chicken cooked in a rich, creamy tomato gravy laced with butter and aromatic dried fenugreek (Kasuri Methi).',
    price: 420,
    category: 'Main Course',
    isAvailable: true,
    isVegetarian: false,
    isGlutenFree: true,
    spicyLevel: 1,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 20,
  },
  {
    restaurantName: 'Punjab Dhaba & Rasoi',
    mealType: 'Dinner',
    name: 'Sarson Ka Saag & Makki Di Roti',
    description: 'Traditional Punjabi mustard greens curry simmered with garlic and ghee, paired with maize flour flatbreads and jaggery.',
    price: 310,
    category: 'Main Course',
    isAvailable: true,
    isVegetarian: true,
    isGlutenFree: true,
    spicyLevel: 1,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 22,
  },

  // 3. Dakshin South Tiffin Room
  {
    restaurantName: 'Dakshin South Tiffin Room',
    mealType: 'Breakfast',
    name: 'Ghee Roast Mysore Masala Dosa',
    description: 'Crispy rice crepes brushed with red spicy garlic chutney and clarified butter, stuffed with potato masala and served with 3 chutneys.',
    price: 140,
    category: 'Main Course',
    isAvailable: true,
    isVegetarian: true,
    isGlutenFree: true,
    spicyLevel: 1,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 12,
  },
  {
    restaurantName: 'Dakshin South Tiffin Room',
    mealType: 'Starters',
    name: 'Medu Vada & Steamed Idli Combo',
    description: 'Crispy fried lentil donuts and fluffy steamed rice cakes served with hot piping lentil sambhar and coconut chutney.',
    price: 120,
    category: 'Starters',
    isAvailable: true,
    isVegetarian: true,
    isGlutenFree: true,
    spicyLevel: 1,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 10,
  },
  {
    restaurantName: 'Dakshin South Tiffin Room',
    mealType: 'Lunch',
    name: 'Chettinad Spicy Chicken Curry',
    description: 'Fiery Tamil Nadu style chicken cooked with roasted coconut, black pepper, star anise, and curry leaves.',
    price: 360,
    category: 'Main Course',
    isAvailable: true,
    isVegetarian: false,
    isGlutenFree: true,
    spicyLevel: 3,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 20,
  },

  // 4. Hyderabadi Shahi Kitchen
  {
    restaurantName: 'Hyderabadi Shahi Kitchen',
    mealType: 'Lunch',
    name: 'Hyderabadi Dum Chicken Biryani',
    description: 'Long-grain Basmati rice slow-cooked with marinated chicken, saffron, mint, and caramelized onions in a sealed clay pot.',
    price: 480,
    category: 'Chef Specials',
    isAvailable: true,
    isVegetarian: false,
    isGlutenFree: true,
    spicyLevel: 2,
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 25,
  },
  {
    restaurantName: 'Hyderabadi Shahi Kitchen',
    mealType: 'Starters',
    name: 'Spicy Nizam Chicken 65',
    description: 'Deep-fried chicken pieces tossed with curry leaves, green chilies, garlic, and freshly crushed black pepper.',
    price: 310,
    category: 'Starters',
    isAvailable: true,
    isVegetarian: false,
    isGlutenFree: true,
    spicyLevel: 3,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 15,
  },
  {
    restaurantName: 'Hyderabadi Shahi Kitchen',
    mealType: 'Dinner',
    name: 'Shahi Mutton Dum Biryani & Salan',
    description: 'Tender tenderized mutton cooked with aged Basmati rice, served with peanut sesame Mirchi Ka Salan gravy.',
    price: 580,
    category: 'Chef Specials',
    isAvailable: true,
    isVegetarian: false,
    isGlutenFree: true,
    spicyLevel: 2,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 30,
  },
  {
    restaurantName: 'Hyderabadi Shahi Kitchen',
    mealType: 'Beverages & Sweets',
    name: 'Shahi Kesari Gulab Jamun with Rabri',
    description: 'Golden milk dumplings soaked in cardamom saffron syrup served warm alongside chilled thickened Rabri cream.',
    price: 180,
    category: 'Desserts',
    isAvailable: true,
    isVegetarian: true,
    isGlutenFree: false,
    spicyLevel: 0,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 10,
  },
  {
    restaurantName: 'Dakshin South Tiffin Room',
    mealType: 'Beverages & Sweets',
    name: 'Kulhad Special Masala Cutting Chai',
    description: 'Authentic Indian tea brewed with fresh ginger, green cardamom, cloves, and milk, served in traditional unglazed clay cups.',
    price: 90,
    category: 'Beverages',
    isAvailable: true,
    isVegetarian: true,
    isGlutenFree: true,
    spicyLevel: 0,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 8,
  },
];

const seedData = async () => {
  try {
    console.log('[Seeder] Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dineease');

    console.log('[Seeder] Clearing old collections...');
    await User.deleteMany({});
    await MenuItem.deleteMany({});
    await Reservation.deleteMany({});

    console.log('[Seeder] Creating demo users...');
    const admin = await User.create({
      name: 'Chef Alexandre (Admin)',
      email: 'admin@dineease.com',
      password: 'adminpassword123',
      role: 'admin',
      phone: '+1 555-0001',
    });

    const staff = await User.create({
      name: 'Marcus Vance (Staff)',
      email: 'staff@dineease.com',
      password: 'staffpassword123',
      role: 'staff',
      phone: '+1 555-0002',
    });

    const customer = await User.create({
      name: 'Sourajit Santra',
      email: 'customer@dineease.com',
      password: 'customerpassword123',
      role: 'customer',
      phone: '+91 9876543210',
    });

    console.log('[Seeder] Seeding multi-restaurant Indian food menu items...');
    await MenuItem.insertMany(initialMenuItems);

    console.log('[Seeder] Seed data populated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seeder Error]', error);
    process.exit(1);
  }
};

seedData();
