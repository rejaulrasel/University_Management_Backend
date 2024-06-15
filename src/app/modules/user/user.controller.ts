import { NextFunction, Request, Response } from "express";
import studentValidationSchema from "../student/student.validations";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { password, student: studentData } = req.body;

        //creating zod validation schema
        // const zodParseData = userValidationSchema.parse(studentData)


        // will call service function to dend this data
        const result = await UserServices.createStudentToDb(password, studentData);

        //send respone to the client
        // res.status(200).json({
        //     success: true,
        //     message: 'Student created Succesfully',
        //     data: result,
        // })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student created Succesfully',
            data: result
        })
    } catch (err) {
        next(err)
    }

};


export const UserControllers = {
    createStudent,
}