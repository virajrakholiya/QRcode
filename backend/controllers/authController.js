const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = {
  // Register controller
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = new User({
        email,
        password: hashedPassword
      });

      await user.save();

      // Generate token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Login controller
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get profile controller
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password');
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = authController; 