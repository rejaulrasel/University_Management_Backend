import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";


const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
        {
            role: "student"
        },
        {
            id: 1,
            _id: 0
        },
    )
        .sort({
            createdAt: -1
        })
        .lean();

    return lastStudent?.id ? lastStudent.id : undefined;
}




//year ...semerter code...4 digits
export const generateStudentId = async (payload: TAcademicSemester) => {
    // first id 0000
    let currentId = (0).toString();
    //2025010000
    const lastStudentId = await findLastStudentId();
    const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
    const currentStudentSemesterYear = payload.year;
    const currentStudentSemesterCode = payload.code;


    if (lastStudentId && lastStudentSemesterYear === currentStudentSemesterYear && lastStudentSemesterCode === currentStudentSemesterCode) {
        currentId = lastStudentId.substring(6)
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `${payload.year}${payload.code}${incrementId}`
    return incrementId;

}


const findLastFacultyId = async () => {
    const lastFacultyId = await User.findOne(
        {
            role: 'faculty'
        },
        {
            id: 1,
            _id: 0
        }
    )
        .sort({
            createdAt: -1
        })
        .lean()

    return lastFacultyId?.id ? lastFacultyId.id : undefined
}




export const generateFacultyId = async () => {

    let currentId = (0).toString();
    const lastFacultyId = await findLastFacultyId();
    if (lastFacultyId) {
        currentId = lastFacultyId.substring(5);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `F-${incrementId}`;
    return incrementId;
}