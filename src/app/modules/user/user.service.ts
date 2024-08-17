import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/AppErrors";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";

const createStudentToDb = async (password: string, payload: TStudent) => {

    //create a user object
    const userData: Partial<TUser> = {};

    //if password is not given, use default password
    userData.password = password || (config.default_password as string)

    //set students role 
    userData.role = 'student'
    //find academic semester info
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)


    //create session for transactio & rollback
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set student id
        userData.id = await generateStudentId(admissionSemester as TAcademicSemester);



        //create a user (transaction-01)
        const newUser = await User.create([userData], { session }); //return an array

        //create a student

        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }

        //set id, _id as a user
        payload.id = newUser[0].id; //embedding id
        payload.user = newUser[0]._id // reference id


        //create student  (transaction-02)
        const newStudent = await Student.create([payload], { session });

        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
        }

        await session.commitTransaction();
        await session.endSession();
        return newStudent;

    }
    catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, err as string)
    }

};

const createFacultyToDb = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};

    userData.role = 'faculty'
    userData.password = password || config.default_password;


    try {
        userData.id = await generateFacultyId();
        // console.log('userdata', userData.id)
        const newUser = await User.create(userData);

        // const newFaculty = await Faculty.create(payload);
    }
    catch (err) {
        throw new AppError(httpStatus.BAD_REQUEST, err as string)
    }




}

export const UserServices = {
    createStudentToDb,
    createFacultyToDb,
}