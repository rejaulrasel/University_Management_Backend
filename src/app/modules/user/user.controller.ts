
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


const createFaculty = catchAsync(
    async (req, res) => {
        const { password, faculty: facultyData } = req.body;

        const result = await UserServices.createFacultyToDb(password, facultyData);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Faculty created Successfully',
            data: result
        });
    });


export const UserControllers = {
    createStudent,
    createFaculty,
}