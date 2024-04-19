import userRepo from "../repo/userRepo.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const USERS_URL = process.env.USERS_URL;

const getAllUsers = async (filters) => {
  return userRepo.getAllUsers(filters);
};

const getUser = (id) => {
  return userRepo.getUser(id);
};

const createUser = async (obj) => {
  return userRepo.createUser(obj);
};

const updateUser = (id, obj) => {
  return userRepo.updateUser(id, obj);
};



const deleteUser = (id) => {
  return userRepo.deleteUser(id);
};

const getUserFromAPI = async (userData) => {
  const username = userData.username;
  const email = userData.email;
  const response = await axios.get(USERS_URL);
  const users = response.data;
  const matchedUser = users.find(
    (user) => user.username === username && user.email === email
  );
  return matchedUser;
};

export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserFromAPI,
};
