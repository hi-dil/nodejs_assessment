const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please provide username'],
  },
  displayusername: {
    type: String,
    required: [true, 'Please provide display username'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6
  },
  timestamp: {
    type: Date,
    required: [true, 'Please provide timestamp']
  }
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function() {
return jwt.sign({userId: this._id, username: this.username}, process.env.JWT_SECRETKEY, {
    expiresIn: '30d'
  })
}

UserSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
