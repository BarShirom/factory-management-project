import departmentRepo from "../repo/departmentRepo.js";
import employeeRepo from "../repo/employeeRepo.js";
import employeeService from "./employeeService.js";

const getAllDepartments = async () => {
  try {
    const departments = await departmentRepo.getAllDepartments();
    const employees = await employeeRepo.getAllEmployees();
    const departmentsAndEmployees = departments.map((dep) => {
      const filterEmployeesByDep = employees.filter(
        (emp) => emp.DepartmentID === dep._id.toString()
      );
      return { ...dep, filterEmployeesByDep };
    });
    return departmentsAndEmployees;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getDepartment = (id) => {
  return departmentRepo.getDepartment(id);
};

const addEmpToDep = async (empId, depId) => {
  await employeeService.updateEmployeeDepartment();
};

const createDepartment = async (obj) => {
  return departmentRepo.createDepartment(obj);
};

const updateDepartment = (id, obj) => {
  return departmentRepo.updateDepartment(id, obj);
};

const deleteDepartment = (id) => {
  return departmentRepo.deleteDepartment(id);
};

export default {
  getAllDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  addEmpToDep,
};
