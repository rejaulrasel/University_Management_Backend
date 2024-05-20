import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
    try {
        const { student: studentData } = req.body;

        // will call service function to dend this data
        const result = await StudentServices.createStudentToDb(studentData);

        //send respone to the client
        res.status(200).json({
            success: true,
            message: 'Student created Succesfully',
            data: result,
        })
    } catch (error) {
        console.log(error)
    }
};

//get all students
const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDb()

        res.status(200).json({
            success: true,
            message: 'Students are retrieved succesfully',
            data: result,
        })
    } catch (error) {
        console.log(error)
    }
};


//get a single student

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const studentId = req.params.studentId
        const result = await StudentServices.getSingleStudentFromDb(studentId);


        res.status(200).json({
            success: true,
            message: 'Student retrieved successfully',
            data: result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}



export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent
}

