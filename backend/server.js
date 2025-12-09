import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/tutorialdb")
  .then(()=>console.log("MongoDB connected"))
  .catch(err=>console.log(err));

const Course = mongoose.model("Course", new mongoose.Schema({
  title:String
}));

app.get("/courses", async(req,res)=>{
  const data = await Course.find();
  res.json(data);
});

app.post("/courses", async(req,res)=>{
  const c = new Course({ title:req.body.title });
  await c.save();
  res.json(c);
});

app.listen(3000, ()=>console.log("Server running"));
