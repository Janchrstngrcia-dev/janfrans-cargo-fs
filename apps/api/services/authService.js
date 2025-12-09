const User = require('../models/User');
const { generateToken } = require('../utils/tokenUtils');

// Service: Create Initial Admin
exports.createInitialAdminService = async (userData) => {
  const adminExists = await User.findOne({ role: 'admin' });
  if (adminExists) {
    throw new Error('Admin user already exists');
  }

  const adminUser = await User.create({
    name: userData.fullName,
    email: userData.email,
    mobile: userData.mobile,
    role: 'admin',
    password: userData.password,
    secretQuestion: userData.secretQuestion,
    secretAnswer: userData.secretAnswer
  });

  return {
    id: adminUser._id,
    name: adminUser.name,
    email: adminUser.email,
    role: adminUser.role
  };
};

// Service: Create Standard User
exports.createUserService = async (userData) => {
  const userExists = await User.findOne({ email: userData.email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name: userData.fullName,
    email: userData.email,
    mobile: userData.mobile,
    role: userData.role,
    password: userData.password,
    secretQuestion: userData.secretQuestion,
    secretAnswer: userData.secretAnswer
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};

// Service: Login User
exports.loginUserService = async (email, password) => {
  // Explicitly selecting password since it is set to select: false in model
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

// Service: Get Current User
exports.getUserByIdService = async (id) => {
  return await User.findById(id);
};

// Get All Users Service
exports.getAllUsersService = async () => {
  // Return all users but exclude passwords
  return await User.find().select('-password');
};