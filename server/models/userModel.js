import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: Number,
  fullName: String,
  numOfActions: Number,
  maxActions: Number
 
});

const User = mongoose.model("user", userSchema);

export default User;
