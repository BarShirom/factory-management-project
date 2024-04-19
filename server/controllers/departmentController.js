import express from "express";
import departmentService from "../services/departmentService.js";
import employeeService from "../services/employeeService.js";

const router = express.Router();

// Entry point: http://localhost:8000/departments

router.get("/", async (req, res) => {
  try {
    const departments = await departmentService.getAllDepartments();
    res.send(departments);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const department = await departmentService.getDepartment(id);
    res.send(department);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newDepartment = req.body;
    const result = await departmentService.createDepartment(newDepartment);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const obj = req.body;
    const { id } = req.params;
    const result = await departmentService.updateDepartment(id, obj);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:depId", async (req, res) => {
  try {
    const { depId } = req.params;
    await departmentService.deleteDepartment(depId);
    await employeeService.deleteEmployeesByDepartmentId(depId);
    res.send({ success: true, message: "successfully deleted." });
  } catch (error) {
    res.send(error);
  }
});

router.post("/:depId/addEmpToNewDep", async (req, res) => {
  try {
    const { empId } = req.body;
    const { depId } = req.params;
    const addEmpToNewDep = await departmentService.addEmpToDep(empId, depId);
    return res.send(addEmpToNewDep);
  } catch (error) {
    return res.send(error);
  }
});

export default router;
