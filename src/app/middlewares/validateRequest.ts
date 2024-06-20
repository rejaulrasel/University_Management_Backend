import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body)
            //validation check
            // if everything is allright call next()
            await schema.parseAsync({
                body: req.body
            })
            return next();
        } catch (err) {
            next(err)
        }
    };
};

export default validateRequest;