import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema({
    Name: String,
    Manager: String

})

const Department = mongoose.model('department', departmentSchema)

export default Department


