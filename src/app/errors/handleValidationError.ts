import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
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