const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

schema.pre('save', async function(next) {
  let admin = this;

  if(!admin.isModified("password")) return next();

  try { 
    const hash = await bcrypt.hash(admin.password, 12);

    admin.password = hash;
    next();
  } catch(err) {
    throw err;
  }
});

schema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
}

schema.methods.generateToken = function() {
  return jwt.sign({ id: this.id }, process.env.USETELAS_JWT_SECRET);
}

module.exports = { Admin: model("Admin", schema) };