const express  = require("express");
const mongoose = require("mongoose");
const Employee = require("./models/employees");

const app = express();
app.use(express.json()); 

mongoose.connect("mongodb://127.0.0.1:27017/companyDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.post("/add-many-employees", async (req, res) => {
    try {
        await Employee.insertMany(req.body);
        res.json({ message: "Employees inserted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/employee", async (req, res) => {
    try {
        const employee = await Employee.find();
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/employee/:id", async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/employee/:id", async (req, res) => {
  try {
    const data = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/employee/:id", async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: "Employee deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
