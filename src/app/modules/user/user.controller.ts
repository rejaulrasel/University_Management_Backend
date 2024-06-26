
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(
    async (req, res) => {
        const { password, student: studentData } = req.body;

        // will call service function to dend this data
        const result = await UserServices.createStudentToDb(password, studentData);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student created Succesfully',
            data: result
        });
    });


export const UserControllers = {
    createStudent,
}