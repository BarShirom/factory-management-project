import Employee from "../models/employeeModel.js";

const getAllEmployees = async () => {
  return Employee.find({}).lean();
};

const getEmployee = async (id) => {
  return Employee.findById(id);
};

const createEmployee = async (obj) => {
  const employee = new Employee(obj);
  return employee.save();
};

const updateEmployee = async (id, obj) => {
  const employee = await Employee.findByIdAndUpdate(id, obj);
  return employee;
};

const deleteEmployee = (id) => {
  return Employee.findByIdAndDelete(id);
};

const deleteEmployees = (id) => {
  return Employee.deleteMany({DepartmentID: id})
}

const addShift = async (empId, shiftId) => {
  return await Employee.findOneAndUpdate(
    { _id: empId },
    {
      $push: { shiftsId: shiftId },
    },
    { new: true }
  );
};

const updateEmployeeDepartment = async (empId, depId) => {
  return await Employee.findByIdAndUpdate({_id: empId}, {DepartmentID: depId}, {new: true})
}

export default {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  addShift,
  deleteEmployees,
  updateEmployeeDepartment
};
