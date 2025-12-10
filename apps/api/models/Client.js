const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
    street: {
    type: String,
    required: false,
    trim: true
    },
    city: {
    type: String,
    required: true,
    trim: true
    },
    barangay: {
    type: String,
    required: true,
    trim: true
    },
    userType: {
    type: Number,
    required: true,
    enum: [5, 6] 
    },
    mobile: {
    type: String,
        required: function ()
        {
            return this.userType === 6;
    },
    trim: true
  },
    status: {
    type: Number,
    default: 1 
  },
    createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Client', clientSchema);