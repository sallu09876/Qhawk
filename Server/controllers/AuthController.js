const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create(username, email, hashedPassword);

    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password) return res.status(400).json({ msg: 'Password is required' });
    if (!username && !email) return res.status(400).json({ msg: 'Username or email is required' });

    // Find user
    const user = username
      ? await User.findByUsername(username)
      : await User.findByEmail(email);

    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Create token — note: PostgreSQL uses `id` not `_id`
    const token = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};