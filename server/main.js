import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import userController from "./controllers/userController.js";
import departmentController from "./controllers/departmentController.js";
import employeeController from "./controllers/employeeController.js";
import shiftController from "./controllers/shiftController.js";
import jwt from "jsonwebtoken";

const app = express();
connectDB();
dotenv.config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const { id } = jwt.verify(authHeader.split(" ")[1]);
    const action = createAction(id);
    if (action.allowedActions <= 0) {
      return res.send({
        success: false,
        message: "maximum actions reached",
      });
    }
    addActionToFile(action);
    updateUserAction(id);
  }

  next();
});
app.use("/users", userController);
app.use("/departments", departmentController);
app.use("/employees", employeeController);
app.use("/shifts", shiftController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
