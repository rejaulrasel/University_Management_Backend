import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
    try {
        const student = req.body;

        // will call service function to dend this data
        const result = await StudentServices.createStudentToDb(student);

        //send respone to the client
        res.status(200).json({
            success: true,
            message: 'Student created Succesfully',
            data: result,
        })
    } catch (error) {
        console.log(error)
    }
}

export const StudentControllers = {
    createStudent,
}

