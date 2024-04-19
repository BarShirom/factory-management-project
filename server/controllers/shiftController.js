import express from "express";
import shiftService from "../services/shiftService.js";

const router = express.Router();

// Entry point: http://localhost:8000/shifts

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const shift = await shiftService.getShift(id);
    res.send(shift);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newShift = req.body;
    const result = await shiftService.createShift(newShift);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const obj = req.body;
    const { id } = req.params;
    const result = await shiftService.updateShift(id, obj);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

export default router;
