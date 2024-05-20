import { StudentModel } from "./student.model";
import { Student } from "./student.interface";


const createStudentToDb = async (student: Student) => {
    const result = await StudentModel.create(student);
    return result;
}


const getAllStudentsFromDb = async () => {
    const result = await StudentModel.find();
    return result;
}


const getSingleStudentFromDb = async (id: string) => {
    const result = await StudentModel.find({ _id: id });
    return result;
}

export const StudentServices = {
    createStudentToDb,
    getAllStudentsFromDb,
    getSingleStudentFromDb,
}