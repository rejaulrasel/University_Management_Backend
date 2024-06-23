import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";
import catchAsync from './../../utils/catchAsync';

const createAcademicSemester = catchAsync(
    async (req, res) => {

        const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Semester is created successfully',
            data: result,
        })

    }
);

const getAllAcademicSemester = catchAsync(
    async (req, res) => {
        const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Semesters are retrived successfully',
            data: result,
        })
    }
)

export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemester
}