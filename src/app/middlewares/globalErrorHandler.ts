/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppErrors";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    let statusCode = 500;
    let message = 'something went wrong!';



    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'something went wrong!'
        }
    ];


    //zod error
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }

    //mongoose validation error
    else if (err?.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }

    //cast error: when search anything with invalid id
    else if (err?.name === "CastError") {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }

    //11000 error: when insert duplicate items into db
    // else if (err?.errorResponse.code === 11000) {
    //     const simplifiedError = handleDuplicateError(err);
    //     statusCode = simplifiedError.statusCode;
    //     message = simplifiedError.message;
    //     errorSources = simplifiedError.errorSources;
    // }


    //customize error for AppEroor class
    else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [{
            path: '',
            message: err?.message
        }]
    }

    //customize error for Eroor class
    else if (err instanceof Error) {
        message = err?.message;
        errorSources = [{
            path: '',
            message: err?.message
        }]
    }


    //ultimate error return from here
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? err?.stack : null,
        err
    })
}

export default globalErrorHandler;

//pattern 
/*
success:
message: ''
errorSources:[
 path:''
 message:''
 ]
 stack:
*/