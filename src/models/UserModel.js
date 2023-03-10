const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = require('../schemas/UserSchema');

const UserModel = mongoose.model('User', UserSchema);

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street,
      postalCode: postal,
      city,
    };
  }

  async signUp() {
    const salt = await bcrypt.genSalt();
    console.log(this.name, this.email, this.address, this.password);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    await UserModel.create({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }

  userExists() {
    return UserModel.findOne({ email: this.email });
  }

  static findUserById(id) {
    return UserModel.findOne({ _id: id }, 'email name address');
  }

  hasMatchingPasswords(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
