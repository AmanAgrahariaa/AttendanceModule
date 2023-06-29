const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    name: String, 
    registrationNumber: String,
    email: String,
    password: String,
    adminType: String,
    position: String,
    course: String,
    branch: String,
    year:String,
});

adminSchema.statics.findAndValidate = async function ({ email, password }) {
    const foundUser = await this.findOne({ email });
    console.log('validate route')
    if (!foundUser) {
      throw new Error("User not found");
    }
    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }
    return foundUser;
};

adminSchema.pre('save', async function (next) {
    console.log('pre.save');
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});


const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;