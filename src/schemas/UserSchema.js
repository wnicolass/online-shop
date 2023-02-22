const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: AddressSchema,
  isAdmin: { type: Boolean },
});

module.exports = UserSchema;
