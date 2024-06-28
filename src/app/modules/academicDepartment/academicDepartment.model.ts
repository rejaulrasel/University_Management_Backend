import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppErrors";


const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    }
}, {
    timestamps: true
})


//check if the department is already exists
academicDepartmentSchema.pre("save", async function (next) {
    const isDepartmentExists = await AcademicDepartment.findOne({
        name: this.name
    });
    if (isDepartmentExists) {
        throw new Error('Deparment is already exists!!');
    }
    next();
})





//check if the department is not exist then dont need to update
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isDepartmentExists = await AcademicDepartment.findOne(query);
    if (!isDepartmentExists) {
        throw new AppError(404, 'Department is not exist!!')
    }
    next()
})


export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);