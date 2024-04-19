import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    StartWorkYear: Number,
    DepartmentID: String,
    shiftsId: [String] 
    

})

const Employee = mongoose.model('employee', employeeSchema)

export default Employee