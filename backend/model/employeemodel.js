import mongoose, { Schema, model } from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const employeeSchema = new Schema({
    empId: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: Number,
    designation: String,
    gender: String,
    courses: [String],
    image: {
        url: String,
        public_id: String
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

employeeSchema.plugin(AutoIncrement, { inc_field: 'empId', start_seq: 100 });

const Employee = model('Employee', employeeSchema);
export default Employee;
