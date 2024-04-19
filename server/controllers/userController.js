import express from "express";
import userService from "../services/userService.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const router = express.Router();

const secretKey = process.env.secretKey;

// Entry point: http://localhost:8000/users

router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const users = await userService.getAllUsers(filters);
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const obj = req.body;
    const { id } = req.params;
    const result = await userService.updateUser(id, obj);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    const matchedUser = await userService.getUserFromAPI(userData);
    if (matchedUser) {
      const token = jwt.sign({ userId: matchedUser.id }, secretKey, {
        expiresIn: "1h",
      });
      console.log("Login successful!");
      console.log("JWT token:", token);

      const userObject = {
        _id: matchedUser.id,
        fullName: matchedUser.name,
        numOfActions: 0,
      };

      const userIfExist = await userService.getUser(matchedUser.id);
      if (!userIfExist) await userService.createUser(userObject);
      return res.send({
        token,
        message: "Login successful and token created.",
        fullName: matchedUser.name,
      });
    } else {
      console.log("Login failed. Invalid username or email.");
      return res.send({ message: "Login failed. Invalid username or email." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.send({ message: "Error during login." });
  }
});



export default router;
