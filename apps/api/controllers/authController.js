const authService = require('../services/authService');

exports.createInitialAdmin = async (req, res) => {
  try {
    const user = await authService.createInitialAdminService(req.body);
    res.status(201).json({
      success: true,
      message: 'Initial admin user created successfully',
      user
    });
  } catch (error) {
    // Determine status code based on error message or type
    const statusCode = error.message === 'Admin user already exists' ? 400 : 500;
    
    // Check for Mongoose Validation Error
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(statusCode).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await authService.createUserService(req.body);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user
    });
  } catch (error) {
    const statusCode = error.message === 'User already exists' ? 400 : 500;
    
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(statusCode).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUserService(email, password);
    
    res.json({
      success: true,
      token: result.token,
      user: result.user
    });
  } catch (error) {
    const statusCode = error.message === 'Invalid credentials' ? 401 : 500;
    res.status(statusCode).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await authService.getUserByIdService(req.user.id);
    
    res.json({ 
      success: true, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await authService.getAllUsersService();
    res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};