import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppErrors";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";


const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
    const queryObj = { ...query }

    //raw searching on email, name, address
    // {email : {$regex: query.searchTerm, $options:'i'}}
    const studentSearchableFields = ['email', 'name.firstName', 'presentAddress']
    let searchTerm = '';
    if (query?.searchTerm) {
        searchTerm = query?.searchTerm as string;
    }

    const searchQuery = Student.find({
        $or: studentSearchableFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' }
        }))
    })

    //filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    console.log({ query, queryObj })


    const filterQuery = searchQuery
        .find(queryObj)
        .populate('user')
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: 'academicFaculty'
        });


    //sorting

    let sort = '-createdAt';
    if (query.sort) {
        sort = query.sort as string;
    }

    const sortQuery = filterQuery.sort(sort);

    //limiting && paginating

    let page = 1
    let limit = Student.length;
    let skip = 0;

    if (query.limit) {
        limit = Number(query.limit);
    }

    if (query?.page) {
        page = Number(query?.page);
        skip = (page - 1) * limit;
    }

    const paginateQuery = sortQuery.skip(skip);

    const limitQuery = paginateQuery.limit(limit)

    //field limiting

    let fields = '-__v';
    if (query?.fields) {
        fields = (query?.fields as string).split(',').join(' ')
    }

    const fieldLimitingQuery = await limitQuery.select(fields);
    return fieldLimitingQuery;
}


const getSingleStudentFromDb = async (id: string) => {
    const result = await Student.findOne({ id })
        .populate('user')
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: 'academicFaculty'
        });
    return result;
}

const deleteSingleStudentFromDB = async (id: string) => {

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedStudent = await Student.findOneAndUpdate(
            { id: id },
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
        }

        const deletedUser = await User.findOneAndUpdate(
            { id: id },
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedStudent;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }


}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {

    //get all the non-primitive data in specific variable and all primitive data in remainingStudentData variable
    const { name, guardian, localGuardian, ...remainingStudentData } = payload;


    // modifiedUpdatedData is the updated data that will sent to the database
    const modifiedUpdatedData: Record<string, unknown> = { ...remainingStudentData }


    /* check if there is any name update
    1. object.keys(name).length means:: in the name variable is there any property
    2.const [key, value] means:: create a object key and value
    3.Object.entries(name) means:: in step two key, value 
    will create from the name object
    4. modifiedUpdatedData[`name.${key}`] = value means:: create a data like name.firstName as `name.${key}` and its value is value

    */
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }


    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }


    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }

    const result = await Student.findOneAndUpdate(
        { id },
        modifiedUpdatedData,
        { new: true }
    )
    return result;
}

export const StudentServices = {
    getAllStudentsFromDb,
    getSingleStudentFromDb,
    deleteSingleStudentFromDB,
    updateStudentIntoDB,
}