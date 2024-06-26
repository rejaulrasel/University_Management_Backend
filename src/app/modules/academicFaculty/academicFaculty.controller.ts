import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(
    async (req, res) => {
        const academicFaculty = req.body;
        const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(academicFaculty);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Faculty is created Successfully',
            data: result
        })
    }
);

const getAllAcademicFaculties = catchAsync(
    async (req, res) => {
        const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Faculties is retrived Successfully',
            data: result
        })
    }
);


const getSingleAcademicFaculty = catchAsync(
    async (req, res) => {
        const { academicFacultyId } = req.params
        const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(academicFacultyId);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Faculty is retrived Successfully',
            data: result
        })
    }
);


const updateAcademicFaculty = catchAsync(
    async (req, res) => {
        const { academicFacultyId } = req.params
        const updateDoc = req.body;
        const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(academicFacultyId, updateDoc);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Faculty is updated Successfully',
            data: result
        })

    }
);



export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
}