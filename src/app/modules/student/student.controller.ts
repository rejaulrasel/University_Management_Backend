import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

//create a higher order function as catchAsync for stopping try-catch repittion


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


//get all students
const deleteSingleStudent = catchAsync(
    async (req, res) => {
        const { studentId } = req.params;
        const result = await StudentServices.deleteSingleStudentFromDB(studentId)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student deleted succesfully',
            data: result
        });
    });


const updateStudent = catchAsync(
    async (req, res) => {
        const { studentId } = req.params;
        const { student } = req.body;
        const result = await StudentServices.updateStudentIntoDB(studentId, student);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student updated succesfully',
            data: result
        });
    }
)


export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteSingleStudent,
    updateStudent,
}

