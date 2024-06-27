import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";


const createAcademicDepartment = catchAsync(
    async (req, res) => {
        const academicDepartment = req.body;
        const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(academicDepartment);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Department is created Successfully',
            data: result
        })
    }
);

const getAllAcademicDepartments = catchAsync(
    async (req, res) => {
        const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Departments is retrived Successfully',
            data: result
        })
    }
);


const getSingleAcademicDepartment = catchAsync(
    async (req, res) => {
        const { academicDepartmentId } = req.params
        const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(academicDepartmentId);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Department is retrived Successfully',
            data: result
        })
    }
);


const updateAcademicDepartment = catchAsync(
    async (req, res) => {
        const { academicDepartmentId } = req.params
        const updateDoc = req.body;
        const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(academicDepartmentId, updateDoc);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Department is updated Successfully',
            data: result
        })

    }
);

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}