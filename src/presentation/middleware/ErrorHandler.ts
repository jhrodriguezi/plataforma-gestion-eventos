import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/customError";
import { HttpCode } from "../../config/constants";


export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error instanceof AppError) {
        const { message, name, stack, validationErrors } = error;
        const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
        res.statusCode = statusCode;
        res.json({ name, message, validationErrors, stack });
    } else {
        const name = 'InternalServerError';
        const message = 'An internal server error occurred';
        const statusCode = HttpCode.INTERNAL_SERVER_ERROR;
        res.statusCode = statusCode;
        res.json({ name, message });
    }
    next();
}