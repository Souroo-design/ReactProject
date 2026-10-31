import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import mongoose from 'mongoose';

// In-memory fallback mock database if MongoDB is not connected
export const mockUsers = [
  {
    id: 'mock_admin_1',
    _id: 'mock_admin_1',
    name: 'Chef Alexandre (Admin)',
    email: 'admin@dineease.com',
    password: 'adminpassword123',
    role: 'admin',
    phone: '+1 555-0001',
  },
  {
    id: 'mock_staff_1',
    _id: 'mock_staff_1',
    name: 'Marcus Vance (Staff)',
    email: 'staff@dineease.com',
    password: 'staffpassword123',
    role: 'staff',
    phone: '+1 555-0002',
  },
  {
    id: 'mock_customer_1',
    _id: 'mock_customer_1',
    name: 'Sourajit Santra',
    email: 'customer@dineease.com',
    password: 'customerpassword123',
    role: 'customer',
    phone: '+91 9876543210',
  },
];

const generateTokens = (user) => {
  const payload = {
    id: user._id || user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET || 'dineease_access_secret_super_secure_key_2026_key',
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET || 'dineease_refresh_secret_super_secure_key_2026_key',
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );

  return { accessToken, refreshToken };
};

const sendTokenResponse = (user, statusCode, res) => {
  const { accessToken, refreshToken } = generateTokens(user);

  // Set httpOnly refresh token cookie
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  return res.status(statusCode).json({
    success: true,
    accessToken,
    user: {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || '',
    },
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a valid full name' });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide an email address' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address format' });
    }

    if (!password) {
      return res.status(400).json({ success: false, message: 'Please provide a password' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists with this email address' });
      }

      const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password,
        role: role || 'customer',
        phone: phone ? phone.trim() : '',
      });

      const { accessToken, refreshToken } = generateTokens(user);
      user.refreshToken = refreshToken;
      await user.save();

      return sendTokenResponse(user, 201, res);
    } else {
      // Mock mode handling
      const existingMock = mockUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (existingMock) {
        return res.status(400).json({ success: false, message: 'User already exists with this email address' });
      }

      const mockUser = {
        id: 'mock_usr_' + Date.now(),
        _id: 'mock_usr_' + Date.now(),
        name: name.trim(),
        email: normalizedEmail,
        password, // In mock simple check
        role: role || 'customer',
        phone: phone ? phone.trim() : '',
      };
      mockUsers.push(mockUser);
      return sendTokenResponse(mockUser, 201, res);
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const user = await User.findOne({ email: normalizedEmail }).select('+password');
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const { accessToken, refreshToken } = generateTokens(user);
      user.refreshToken = refreshToken;
      await user.save();

      return sendTokenResponse(user, 200, res);
    } else {
      const mockUser = mockUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (!mockUser || mockUser.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
      return sendTokenResponse(mockUser, 200, res);
    }
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const tokenFromCookie = req.cookies?.refreshToken;

    if (!tokenFromCookie) {
      return res.status(401).json({ success: false, message: 'Refresh token cookie missing' });
    }

    const refreshSecret = process.env.JWT_REFRESH_SECRET || 'dineease_refresh_secret_super_secure_key_2026_key';
    
    let decoded;
    try {
      decoded = jwt.verify(tokenFromCookie, refreshSecret);
    } catch (err) {
      res.clearCookie('refreshToken');
      return res.status(401).json({ success: false, message: 'Refresh token expired or invalid' });
    }

    const isConnected = mongoose.connection.readyState === 1;

    let user;
    if (isConnected) {
      user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ success: false, message: 'User no longer exists' });
      }
    } else {
      user = mockUsers.find((u) => u.id === decoded.id || u._id === decoded.id) || decoded;
    }

    // Refresh token rotation: issue new pair
    return sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const tokenFromCookie = req.cookies?.refreshToken;

    if (tokenFromCookie && mongoose.connection.readyState === 1) {
      const user = await User.findOne({ refreshToken: tokenFromCookie });
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.status(200).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
      });
    } else {
      return res.status(200).json({
        success: true,
        user: req.user,
      });
    }
  } catch (error) {
    next(error);
  }
};
