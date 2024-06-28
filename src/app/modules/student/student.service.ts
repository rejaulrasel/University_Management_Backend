
import { Student } from "./student.model";


const getAllStudentsFromDb = async () => {
    const result = await Student.find()
        .populate('user')
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: 'academicFaculty'
        });
    return result;
}


const getSingleStudentFromDb = async (id: string) => {
    const result = await Student.find({ _id: id })
        .populate('user')
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: 'academicFaculty'
        });
    return result;
}

export const StudentServices = {
    getAllStudentsFromDb,
    getSingleStudentFromDb,
}