const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/@[a-zA-z0-9]+\.[a-zA-z0-9]+$/, 'Invalid email address!'],
        minLength: [10, 'Email should be at least 10 characters long'],
    },
    password: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9]+$/, 'Password should be alphanumeric'],
        minLength: [6, 'Password should be at least 6 characters long']

    },
});

userSchema.pre('save', async function(){
   
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
});

userSchema.virtual('rePassword')
 .set(function(value){
    if(value !== this.password){
        throw new mongoose.Error('Password mismatch');
    }
   
 });

const User = mongoose.model('User', userSchema);

module.exports = User;