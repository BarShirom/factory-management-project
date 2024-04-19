import shiftRepo from "../repo/shiftRepo.js";

const getShift = (id) => {
  return shiftRepo.getShift(id);
};

const createShift = async (obj) => {
  return shiftRepo.createShift(obj);
};

const updateShift = (id, obj) => {
  return shiftRepo.updateShift(id, obj);
};

export default { getAllShift, getShift, createShift, updateShift };
