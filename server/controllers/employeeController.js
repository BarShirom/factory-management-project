import express from "express";
import employeeService from "../services/employeeService.js";

const router = express.Router();

// Entry point: http://localhost:8000/employees

router.get("/", async (req, res) => {
  const { filterEmployeesByNotDepartmentId } = req.query;
  try {
    const employeesData =
      await employeeService.getAllEmployeesOfOtherDepartments(
        filterEmployeesByNotDepartmentId
      );
    return res.send(employeesData);
  } catch (error) {
    return res.send(error);
  }
});



router.get("/employeesData", async (req, res) => {
  try {
    const employeesData = await employeeService.getEmployeesData();
    return res.send(employeesData);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getEmployee(id);
    res.send(employee);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newEmployee = req.body;
    const result = await employeeService.createEmployee(newEmployee);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const obj = req.body;
    const { id } = req.params;
    const result = await employeeService.updateEmployee(id, obj);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employeeService.deleteEmployee(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id/shifts", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employeeService.getEmployeeShifts(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id/shifts/:shiftId", async (req, res) => {
  try {
    const { id, shiftId } = req.params;
    const result = await employeeService.addShift(id, shiftId);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("");

export default router;
