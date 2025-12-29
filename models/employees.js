const mongoose = require("mongoose");
// require = to join mongoDB and node.js and call library

const employeeSchema = new mongoose.Schema({
    name: String,
    age: Number,
    department: String,
    position: String
});
//schema = declare data type in MongoDB

module.exports = mongoose.model("Employee", employeeSchema);
// to use MongoDB syntax by exporting