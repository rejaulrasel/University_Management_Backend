import { NextFunction, Request, Response } from "express";
import Joi from 'joi'
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userNameSchema = Joi.object({
            firstName: Joi.string().max(30).required(),
            middleName: Joi.string().max(30).required(),
            lastName: Joi.string().max(30).required(),
        })

        const guardianSchema = Joi.object({
            fatherName: Joi.string().required(),
            fatherOccupation: Joi.string().required(),
            fatherContactNo: Joi.string().required(),
            motherName: Joi.string().required(),
            motherOccupation: Joi.string().required(),
            motherContactNo: Joi.string().required(),
        })

        const localGuardianSchema = Joi.object({
            name: Joi.string().required(),
            occupation: Joi.string().required(),
            contactNo: Joi.string().required(),
            address: Joi.string().required(),
        })

        //Joi Schema ----> client data will validate by this schema  
        const studentSchema = Joi.object({
            id: Joi.string().required(),
            name: userNameSchema.required(),
            gender: Joi.string().valid('male', 'female', 'other').required(),
            dateOfBirth: Joi.string(),
            email: Joi.string().email().required(),
            contactNo: Joi.string().required(),
            emergencyContactNo: Joi.string().required(),
            bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
            presentAddress: Joi.string().required(),
            permanentAddress: Joi.string().required(),
            guardian: guardianSchema.required(),
            localGuardian: localGuardianSchema.required(),
            profileImg: Joi.string(),
            isActive: Joi.string().valid('active').required(),
        })




        const { student: studentData } = req.body;


        //validation by Joi
        const { error, value } = studentSchema.validate(studentData);
        if (error) {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: error.details
            })
            console.log({ error }, { value })
            return;
        }


        // will call service function to dend this data
        const result = await StudentServices.createStudentToDb(studentData);

        //send respone to the client
        res.status(200).json({
            success: true,
            message: 'Student created Succesfully',
            data: result,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: error,
        })
    }

};

//get all students
const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDb()

        res.status(200).json({
            success: true,
            message: 'Students are retrieved succesfully',
            data: result,
        })
    } catch (error) {
        console.log(error)
    }
};


//get a single student

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const studentId = req.params.studentId
        const result = await StudentServices.getSingleStudentFromDb(studentId);


        res.status(200).json({
            success: true,
            message: 'Student retrieved successfully',
            data: result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}



export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent
}

