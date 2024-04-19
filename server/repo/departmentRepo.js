import Department from "../models/departmentModel.js"

const getAllDepartments = async () => {
    return Department.find().lean()
}

const getDepartment = async (id) => {
    return Department.findById(id)
}

const createDepartment = async (obj) => {
    const department = new Department(obj);
    return department.save();
  };
  
  
  const updateDepartment = (id, obj) => {
    return Department.findByIdAndUpdate(id, obj);
  };
  
  
  const deleteDepartment = (id) => {
    return Department.findByIdAndDelete(id);
  };

  export default {getAllDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment}

