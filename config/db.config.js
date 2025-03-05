const mongoose = require('mongoose')
const { MONGO_URL } = require('./env.config')

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB connected...");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

module.exports = connectDB