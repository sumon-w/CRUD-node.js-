const express  = require("express");
const mongoose = require("mongoose");
const Employee = require("./models/employee");

const app = express();
app.use(express.json()); 

mongoose.connect("mongodb://127.0.0.1:27017/companyDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


app.post("/add-many-employee",  async (req,res) => {
    try {
        await Employee.insertMany(req.body);
        res.send("Employees inserted successfully");
    } catch (err)
    {
        res.status(500).send(err);
    }
});

// to display all employees
app.get("/employee", async (req, res) => {
    try {
        const employee = await Employee.find();
        res.join(employee);
    } catch (err)
    {
        res.status(500).json(err);
    }
});

app.get("/employee/:id", async (req, res) =>
{
    try {
        const employee = await Employee.findById(req.params.id);
        res.join(employee);
    } catch (err){
        res.status(500).json(err);
    }
});
// for update = put  and patch
app.put("/employee/:id", async (req, res) => 
{
    try {
        await Employee.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: "Employee updated successfully"});
    } catch (err){
        res.status(500).json(err);
    }
});

app.delete("/employee/:id", async (req, res) => 
{
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: "Employee Deleted successfully"});
    } catch (err){
        res.status(500).json(err);
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
