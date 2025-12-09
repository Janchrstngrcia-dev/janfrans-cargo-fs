const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
  },

  mobile: {
    type: String,
    required: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },

  role: {
    type: String,
    enum: ["user", "admin", "staff", "driver"],
    required: true,
  },

  secretQuestion: {
    type: String,
    required: true
  },

  secretAnswer: {
    type: String,
    required: true,
    select: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password & secret answer
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  if (this.isModified("secretAnswer")) {
    this.secretAnswer = await bcrypt.hash(this.secretAnswer, 10);
  }

  next(); 
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
