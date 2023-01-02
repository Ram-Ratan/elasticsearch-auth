const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

module.exports = userSchema;








