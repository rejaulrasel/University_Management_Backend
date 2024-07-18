import mongoose from "mongoose";
import { TErrorSources } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
    const statusCode = 400;
    const errorSources: TErrorSources = Object.values(err?.errors).map((value) => {
        return {
            path: value.path,
            message: value.message
        }
    });

    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    }
};


export default handleValidationError;