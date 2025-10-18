const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

//mongoDB DataBase
mongoose
  .connect("mongodb://127.0.0.1:27017/crudApp")
  .then(() => console.log("MongoDB Connected Sucessfully "))
  .catch((err) => console.log(err));

//schemeDesign
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  gender: String,
  role: String,
});

const Users = mongoose.model("userData", userSchema);

//Create Api
app.post("/createUser", async (req, res) => {
  try {
    const users = await Users.create(req.body);
    res.json(users);
    console.log(users);
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Get Api
app.get("/getUser",async(req,res)=>{
  const users = await Users.find();
  res.json(users)
})

//update Api
app.put("/update/:ids", async (req, res) => {
  try {
    const updated = await Users.findByIdAndUpdate(req.params.ids, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating user" });
  }
});

//Delete Api
app.delete("/deleted/:deleid",async (req,res)=>{
 
    const deleted = await Users.findByIdAndDelete(req.params.deleid);
    res.json(deleted);
})

//Port listen Number
app.listen(port, () => console.log(`server is running ${port} `));
