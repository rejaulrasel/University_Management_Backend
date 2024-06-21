import { z } from "zod";
import { AcademicSemesterCode, AcademicSemesterName, MonthsEnum } from "./academicSemester.constant";

const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
        code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
        year: z.date(),
        startMonth: z.enum([...MonthsEnum] as [string, ...string[]]),
        endMonth: z.enum([...MonthsEnum] as [string, ...string[]])

    })
})

export const AcademicValidations = {
    createAcademicSemesterValidationSchema
}