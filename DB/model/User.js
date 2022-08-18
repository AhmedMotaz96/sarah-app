const mongoose = require('mongoose');
const bycrpt = require('bcrypt')
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    age: Number,
    gender: {
        type: String,
        default: "male"
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'User'
    }
}, {
    timestamps: true
})
userSchema.pre('save' , async function(next) {
    console.log(this);
    this.password = await  bycrpt.hash(this.password,parseInt(process.env.saltRound) )
    console.log(this);
    next()
})
const userModel = mongoose.model('User', userSchema);
module.exports = userModel