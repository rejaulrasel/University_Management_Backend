import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentToDb = async (password: string, studentData: TStudent) => {

    //create a user object
    const userData: Partial<TUser> = {};

    //if password is not given, use default password
    userData.password = password || (config.default_password as string)

    //set students role 
    userData.role = 'student'

    //set student id manuallay
    userData.id = '20184201'

    //create a user
    const newUser = await User.create(userData);

    //create a student

    if (Object.keys(newUser).length) {
        //set id, _id as a user
        studentData.id = newUser.id; //embedding id
        studentData.user = newUser._id // reference id

        const newStudent = await Student.create(studentData);
        return newStudent;
    }
}

export const UserServices = {
    createStudentToDb,
}