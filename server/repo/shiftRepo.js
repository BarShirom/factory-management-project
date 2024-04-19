import Shift from "../models/shiftModel.js";

const getAllShifts = async (params) => {
  return Shift.find(params);
};

const getShift = async (id) => {
  return Shift.findById(id);
};

const createShift = async (obj) => {
  const shift = new Shift(obj);
  return shift.save();
};

const updateShift = (id, obj) => {
  return Shift.findByIdAndUpdate(id, obj);
};

export default { getAllShifts, getShift, createShift, updateShift };
