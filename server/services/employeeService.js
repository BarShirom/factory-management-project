import employeeRepo from "../repo/employeeRepo.js";
import shiftRepo from "../repo/shiftRepo.js";
import departmentRepo from "../repo/departmentRepo.js";

const getAllEmployees = async () => {
  return employeeRepo.getAllEmployees();
};

const getAllEmployeesOfOtherDepartments = async (depId) => {
  const employees = await employeeRepo.getAllEmployees();
  const filteredEmployees = employees.filter(
    (emp) => emp.DepartmentID !== depId
  );
  return filteredEmployees;
};

const getEmployee = async (id) => {
  try {
    const employee = await employeeRepo.getEmployee(id);
    const shifts = await shiftRepo.getAllShifts();
    const employeeShifts = shifts.filter((shift) =>
      employee.shiftsId.includes(shift._id)
    );
    return { ...employee, employeeShifts };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createEmployee = async (obj) => {
  return employeeRepo.createEmployee(obj);
};

const updateEmployee = async (id, obj) => {
  console.log(id, obj);
  try {
    const response = await employeeRepo.updateEmployee(id, obj);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteEmployee = (id) => {
  return employeeRepo.deleteEmployee(id);
};

const getEmployeesData = async () => {
  const employees = await employeeRepo.getAllEmployees();
  const departments = await departmentRepo.getAllDepartments();
  const employeesAndDepartments = employees.map((emp) => {
    try {
      const departmentData = departments.find(
        (dep) => dep._id == emp.DepartmentID
      );
      if (!departmentData) {
        return {
          id: emp._id,
          fullName: fullName,
          department: "No departments found.",
          shifts: emp.shiftsId,
        };
      }
      const fullName = emp.FirstName + emp.LastName;
      return {
        id: emp._id,
        fullName: fullName,
        department: { name: departmentData.Name, id: departmentData._id },
        shifts: emp.shiftsId,
      };
    } catch (e) {
      console.log(e);
    }
  });

  const shifts = await shiftRepo.getAllShifts();

  const formatDate = (date) => {
    return date.toString().slice(0, 10);
  };

  const clientShifts = shifts.map((shift) => {
    try {
      return {
        id: shift._id,
        date: formatDate(shift.Date),
        time: shift.StartingHour + "-" + shift.EndingHour,
      };
    } catch (error) {
      console.log(error);
    }
  });
  const employeeData = employeesAndDepartments.map((emp) => {
    const shiftsData = clientShifts.filter((shift) =>
      emp.shifts.includes(shift.id)
    );
    return { ...emp, shifts: shiftsData };
  });
  return employeeData;
};

const getEmployeeShifts = async (id) => {
  try {
    const employee = await employeeRepo.getEmployee(id);
    if (employee === null) {
      return [];
    }
    const shifts = await shiftRepo.getAllShifts();
    const employeeShifts = shifts.filter((shift) =>
      employee.shiftsId.includes(shift._id)
    );
    return employeeShifts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addShift = async (empId, shiftId) => {
  const shiftExist = await shiftRepo.getShift(shiftId);
  if (shiftExist === null) {
    return {};
  }
  const updateShiftEmployee = await employeeRepo.addShift(empId, shiftId);

  return updateShiftEmployee;
};

const deleteEmployeesByDepartmentId = async (depId) => {
  try {
    await employeeRepo.deleteEmployees(depId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateEmployeeDepartment = async (empId, depId) => {
  try {
    await employeeRepo.updateEmployeeDepartment(empId, depId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeesData,
  getEmployeeShifts,
  addShift,
  deleteEmployeesByDepartmentId,
  getAllEmployeesOfOtherDepartments,
  updateEmployeeDepartment,
};
