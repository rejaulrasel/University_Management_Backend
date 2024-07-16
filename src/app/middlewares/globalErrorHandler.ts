/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    let statusCode = err.statusCode || 500;
    let message = err.message || 'something went wrong!';



    let errorSources: TErrorSource = [
        {
            path: '',
            message: 'something went wrong!'
        }
    ];


    const handleZodError = (err: ZodError) => {
        statusCode = 309;
        message = 'Validation Error';
        const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
            return {
                path: issue?.path[issue?.path.length - 1],
                message: issue?.message
            }
        })
        return {
            statusCode,
            message,
            errorSources,
        }

    }

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }


    //ultimate error return from here
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? err?.stack : null
        // error: err
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