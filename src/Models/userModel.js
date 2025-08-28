import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, " please provide a username"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
        unique: true
    },
    number: {
        type: Number,
        required: [true, "please provide a number"],
        unique: true
    },
    company: {
        type: String,
        required: [true, "please provide a company name"],
        unique: false
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
    },
      role: { 
        type: String, 
        enum: ["user", "admin"], 
        default: "user" }, // ✅ NEW
})
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;