import { HttpCode } from '../config/constants';

export interface ValidationType {
	fields: string[];
	constraint: string;
}

interface AppErrorArgs {
	name?: string;
	statusCode: HttpCode;
	message: string;
	validationErrors?: ValidationType[];
}

export class AppError extends Error {
	public readonly name: string;
	public readonly statusCode: HttpCode;
	public readonly validationErrors?: ValidationType[];

	constructor(args: AppErrorArgs) {
		const { message, name, statusCode, validationErrors } = args;
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = name ?? 'Aplication Error';
		this.statusCode = statusCode;
		this.validationErrors = validationErrors;
		Error.captureStackTrace(this);
	}

	static badRequest(message: string, validationErrors?: ValidationType[]): AppError {
		return new AppError({ name: 'BadRequestError', message, statusCode: HttpCode.BAD_REQUEST, validationErrors });
	}

	static unauthorized(message: string): AppError {
		return new AppError({ name: 'UnauthorizedError', message, statusCode: HttpCode.UNAUTHORIZED });
	}

	static forbidden(message: string): AppError {
		return new AppError({ name: 'ForbiddenError', message, statusCode: HttpCode.FORBIDDEN });
	}

	static notFound(message: string): AppError {
		return new AppError({ name: 'NotFoundError', message, statusCode: HttpCode.NOT_FOUND });
	}

	static internalServer(message: string): AppError {
		return new AppError({ name: 'InternalServerError', message, statusCode: HttpCode.INTERNAL_SERVER_ERROR });
	}
}