import { MenuItem } from '../models/MenuItem.js';
import mongoose from 'mongoose';

// In-memory mock menu items grouped by authentic Indian Restaurants & Meal Times
export let mockMenuItems = [
  // 1. Bukhara Royal Grill
  {
    _id: 'item_101',
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
    _id: 'item_102',
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
    _id: 'item_103',
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
    _id: 'item_104',
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
    _id: 'item_201',
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
    _id: 'item_202',
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
    _id: 'item_203',
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
    _id: 'item_204',
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
    _id: 'item_301',
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
    _id: 'item_302',
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
    _id: 'item_303',
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
    _id: 'item_401',
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
    _id: 'item_402',
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
    _id: 'item_403',
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
    _id: 'item_404',
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
    _id: 'item_405',
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

export const getMenuItems = async (req, res, next) => {
  try {
    const { category, search, availableOnly, vegetarianOnly, glutenFreeOnly, restaurantName, mealType } = req.query;

    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (restaurantName && restaurantName !== 'All') {
        query.restaurantName = restaurantName;
      }
      if (mealType && mealType !== 'All') {
        query.mealType = mealType;
      }
      if (availableOnly === 'true') {
        query.isAvailable = true;
      }
      if (vegetarianOnly === 'true') {
        query.isVegetarian = true;
      }
      if (glutenFreeOnly === 'true') {
        query.isGlutenFree = true;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { restaurantName: { $regex: search, $options: 'i' } },
        ];
      }

      const items = await MenuItem.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: items.length, data: items });
    } else {
      let filtered = [...mockMenuItems];

      if (category && category !== 'All') {
        filtered = filtered.filter((i) => i.category === category);
      }
      if (restaurantName && restaurantName !== 'All') {
        filtered = filtered.filter((i) => i.restaurantName === restaurantName);
      }
      if (mealType && mealType !== 'All') {
        filtered = filtered.filter((i) => i.mealType === mealType);
      }
      if (availableOnly === 'true') {
        filtered = filtered.filter((i) => i.isAvailable);
      }
      if (vegetarianOnly === 'true') {
        filtered = filtered.filter((i) => i.isVegetarian);
      }
      if (glutenFreeOnly === 'true') {
        filtered = filtered.filter((i) => i.isGlutenFree);
      }
      if (search) {
        const term = search.toLowerCase();
        filtered = filtered.filter(
          (i) =>
            i.name.toLowerCase().includes(term) ||
            i.description.toLowerCase().includes(term) ||
            (i.restaurantName && i.restaurantName.toLowerCase().includes(term))
        );
      }

      return res.status(200).json({ success: true, count: filtered.length, data: filtered });
    }
  } catch (error) {
    next(error);
  }
};

export const createMenuItem = async (req, res, next) => {
  try {
    const { name, restaurantName, mealType, description, price, category, isAvailable, isVegetarian, isGlutenFree, spicyLevel, rating, imageUrl, preparationTimeMinutes } = req.body;

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({ success: false, message: 'Missing required menu item fields' });
    }

    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const item = await MenuItem.create({
        name,
        restaurantName: restaurantName || 'Bukhara Royal Grill',
        mealType: mealType || 'Lunch',
        description,
        price: Number(price),
        category,
        isAvailable: isAvailable !== undefined ? isAvailable : true,
        isVegetarian: Boolean(isVegetarian),
        isGlutenFree: Boolean(isGlutenFree),
        spicyLevel: Number(spicyLevel) || 0,
        rating: Number(rating) || 4.8,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        preparationTimeMinutes: Number(preparationTimeMinutes) || 15,
      });

      return res.status(201).json({ success: true, data: item });
    } else {
      const newItem = {
        _id: 'item_' + Date.now(),
        name,
        restaurantName: restaurantName || 'Bukhara Royal Grill',
        mealType: mealType || 'Lunch',
        description,
        price: Number(price),
        category,
        isAvailable: isAvailable !== undefined ? isAvailable : true,
        isVegetarian: Boolean(isVegetarian),
        isGlutenFree: Boolean(isGlutenFree),
        spicyLevel: Number(spicyLevel) || 0,
        rating: Number(rating) || 4.8,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        preparationTimeMinutes: Number(preparationTimeMinutes) || 15,
      };
      mockMenuItems.unshift(newItem);
      return res.status(201).json({ success: true, data: newItem });
    }
  } catch (error) {
    next(error);
  }
};

export const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const item = await MenuItem.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!item) {
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      }
      return res.status(200).json({ success: true, data: item });
    } else {
      const index = mockMenuItems.findIndex((i) => i._id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      }
      mockMenuItems[index] = { ...mockMenuItems[index], ...req.body };
      return res.status(200).json({ success: true, data: mockMenuItems[index] });
    }
  } catch (error) {
    next(error);
  }
};

export const toggleAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const item = await MenuItem.findById(id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      }
      item.isAvailable = !item.isAvailable;
      await item.save();
      return res.status(200).json({ success: true, data: item });
    } else {
      const item = mockMenuItems.find((i) => i._id === id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      }
      item.isAvailable = !item.isAvailable;
      return res.status(200).json({ success: true, data: item });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const item = await MenuItem.findByIdAndDelete(id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      }
      return res.status(200).json({ success: true, message: 'Menu item deleted' });
    } else {
      mockMenuItems = mockMenuItems.filter((i) => i._id !== id);
      return res.status(200).json({ success: true, message: 'Menu item deleted' });
    }
  } catch (error) {
    next(error);
  }
};
