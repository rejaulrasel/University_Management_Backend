import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent: RequestHandler = async (req, res, next) => {
    try {

        const { password, student: studentData } = req.body;

        //creating zod validation schema
        // const zodParseData = userValidationSchema.parse(studentData)


        // will call service function to dend this data
        const result = await UserServices.createStudentToDb(password, studentData);

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