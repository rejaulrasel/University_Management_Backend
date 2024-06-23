import { Schema, model } from "mongoose";
import { AcademicSemesterCode, AcademicSemesterName, MonthsEnum } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";



const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            enum: AcademicSemesterName,
            required: true,
        },
        code: {
            type: String,
            enum: AcademicSemesterCode,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        startMonth: {
            type: String,
            enum: MonthsEnum,
            required: true,
        },
        endMonth: {
            type: String,
            enum: MonthsEnum,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const AcademicSemester =
    model<TAcademicSemester>('AcademicSemeter', academicSemesterSchema)
