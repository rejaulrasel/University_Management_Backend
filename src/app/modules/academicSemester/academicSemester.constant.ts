import { TAcademicSemesterCode, TAcademicSemesterCodeNameMapper, TAcademicSemesterName, TMonths } from "./academicSemester.interface";

export const AcademicSemesterName: TAcademicSemesterName[] = ["Autumn", "Summar", "Fall"];

export const AcademicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];

export const MonthsEnum: TMonths[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const academicSemesterCodeNameMapper: TAcademicSemesterCodeNameMapper = {
    Autumn: '01',
    Summar: '02',
    Fall: '03',
}