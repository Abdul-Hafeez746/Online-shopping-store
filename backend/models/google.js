const mongoose = require('mongoose');
// const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  name:String,
  email:String,
  isVerified:String,
  token:String,
  role:String,
  signupSource:String
});

// userSchema.plugin(findOrCreate);
const User = mongoose.model('User', userSchema);

module.exports = User;