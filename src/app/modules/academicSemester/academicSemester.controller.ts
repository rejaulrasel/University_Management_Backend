import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

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

const getSingleAcademicSemester = catchAsync(
    async (req, res) => {
        const semesterId = req.params.semesterId;
        const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Semester is retrived successfully',
            data: result,
        })
    }
)


const updateSingleAcademicSemester = catchAsync(
    async (req, res) => {
        const semesterId = req.params.semesterId;
        const updateDoc = req.body;
        const result = await AcademicSemesterServices.updateSigleAcademicSemerterIntoDB(semesterId, updateDoc);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Semester is updatedd successfully',
            data: result,
        })
    }
)
export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateSingleAcademicSemester,

}