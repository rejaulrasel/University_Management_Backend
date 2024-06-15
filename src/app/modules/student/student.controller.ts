import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validations";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


//get all students
const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await StudentServices.getAllStudentsFromDb()

        // res.status(200).json({
        //     success: true,
        //     message: 'Students are retrieved succesfully',
        //     data: result,
        // })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Students are retrieved succesfully',
            data: result
        })
    } catch (err) {
        next(err)
    }
};


//get a single student

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.params.studentId
        const result = await StudentServices.getSingleStudentFromDb(studentId);


        // res.status(200).json({
        //     success: true,
        //     message: 'Student retrieved successfully',
        //     data: result
        // })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student retrieved succesfully',
            data: result
        })
    } catch (err) {
        next(err)
    }
}



export const StudentControllers = {
    getAllStudents,
    getSingleStudent
}

