import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

//create a higher order function as catchAsync for stopping try-catch repittion
const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(err => next(err))
    }
}

//get a single student
const getSingleStudent = catchAsync(
    async (req, res) => {
        const studentId = req.params.studentId
        const result = await StudentServices.getSingleStudentFromDb(studentId);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student retrieved succesfully',
            data: result
        });
    });



//get all students
const getAllStudents = catchAsync(
    async (req, res) => {
        const result = await StudentServices.getAllStudentsFromDb()

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Students are retrieved succesfully',
            data: result
        });
    });





export const StudentControllers = {
    getAllStudents,
    getSingleStudent
}

