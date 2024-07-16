import { Schema, model } from 'mongoose';
import validator from 'validator';
import { TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';
import AppError from '../../errors/AppErrors';
import { httpStatus } from 'http-status';
const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        // maxlength: [20, 'First Name can not be more than 20 character']
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],

        //validation using validator package
        validate: {
            validator: (value: string) => validator.isAlpha(value),
            message: 'Last Name {VALUE} is not valid'
        }
    },
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: { type: String, required: [true, 'Father name is required'] },
    fatherOccupation: { type: String, required: [true, 'Father occupation is required'] },
    fatherContactNo: { type: String, required: [true, 'Father contact number is required'] },
    motherName: { type: String, required: [true, 'Mother name is required'] },
    motherOccupation: { type: String, required: [true, 'Mother occupation is required'] },
    motherContactNo: { type: String, required: [true, 'Mother contact number is required'] },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: { type: String, required: [true, 'Local guardian name is required'] },
    occupation: { type: String, required: [true, 'Local guardian occupation is required'] },
    contactNo: { type: String, required: [true, 'Local guardian contact number is required'] },
    address: { type: String, required: [true, 'Local guardian address is required'] },
});

// main student schema
const studentschema = new Schema<TStudent>({
    id: { type: String, required: [true, 'ID is required'], unique: true },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, "user ID is required"],
        unique: true,
        ref: 'User'
    },
    name: {
        type: userNameSchema,
        required: [true, 'Name is required'],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not valid, gender should be male/female/other'
        },
        required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: { type: String, required: [true, 'Emergency contact number is required'] },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: [true, 'Present address is required'] },
    permanentAddress: { type: String, required: [true, 'Permanent address is required'] },
    guardian: {
        type: guardianSchema,
        required: [true, 'Guardian is required'],
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local guardian is required'],
    },
    profileImg: { type: String },
    admissionSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicSemester'
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicDepartment'
    },
    isDeleted: {
        type: Boolean, default: false
    },
},
    {
        toJSON: {
            virtuals: true,
        }
    }
);

// studentschema.pre('save', async function (next) {
//     const isStudentExists = await Student.findOne(
//         { email: this.email }
//     )
//     // console.log(isStudentExists)
//     if (isStudentExists) {
//         console.log('pre save middleware hitted');
//         throw new AppError(httpStatus.NOT_FOUND, 'Student Already exists');
//     }
//     next();
// })


//if user does not exists when delteting

studentschema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isStudentExists = await Student.findOne(query);
    // console.log(query, isStudentExists)

    if (!isStudentExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
    }
    next();

})


//Create Student Model

export const Student = model<TStudent>('Student', studentschema);