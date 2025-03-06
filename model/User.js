const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { SALT_PW } = require("../config/env.config");


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    sessions: [{ token: String, createdAt: { type: Date, default: Date.now } }]
})


//Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, parseInt(SALT_PW));
    next();
})

module.exports = mongoose.model("User", userSchema)