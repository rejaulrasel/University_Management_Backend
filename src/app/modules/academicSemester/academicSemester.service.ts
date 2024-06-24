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

const getSingleAcademicSemesterFromDB = async (payload: string) => {
    const result = await AcademicSemester.findById(payload)
    return result;
}

const updateSigleAcademicSemerterIntoDB = async (semesterId: string, payload: Partial<TAcademicSemester>) => {

    if (payload.name && payload.code && academicSemesterCodeNameMapper[payload.name] !== payload.code) {
        throw new Error('Invalid semester code!!')
    }
    const result = await AcademicSemester.findOneAndUpdate({ _id: semesterId }, payload, { new: true })
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDB,
    updateSigleAcademicSemerterIntoDB,



}