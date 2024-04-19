import User from "../models/userModel.js"

const getAllUsers = async (filters) => {
    return User.find(filters)
}

const getUser = async (id) => {
    return User.findById(id).lean()
}

const createUser = async (obj) => {
    const user = new User(obj);
    return user.save();
  };
  
  
  const updateUser = (id, obj) => {
    return User.findByIdAndUpdate(id, obj);
  };

  const incrementUserActionByOne = (id) => {
    return User.findByIdAndUpdate(id, { $inc: { "numOfActions": 1 }} )
  }
  
  
  const deleteUser = (id) => {
    return User.findByIdAndDelete(id);
  };

  export default {getAllUsers, getUser, createUser, updateUser, deleteUser, incrementUserActionByOne}