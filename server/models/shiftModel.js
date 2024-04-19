import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
  Date: Date,
  StartingHour: String,
  EndingHour: String,
});

const Shift = mongoose.model("shift", shiftSchema);

export default Shift;
