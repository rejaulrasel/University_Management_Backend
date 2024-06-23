import { academicSemesterCodeNameMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

    //check whether the semester has the correct code
    if (academicSemesterCodeNameMapper[payload.name] !== payload.code) {
        throw new Error('Academic semester code is invalid!')
    }

    const result = await AcademicSemester.create(payload);
    return result;
}

const getAllAcademicSemesterFromDB = async () => {
    const result = await AcademicSemester.find()
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,

}