import { REGEX_EMAIL } from "../../config/constants";
import { AppError, ValidationType } from "../../errors/customError";
import { SharedDTO } from "./SharedDTO";

export class UpdateUserDTO implements SharedDTO<UpdateUserDTO> {
	private constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) {
		this.validate(this);
	}

	public validate(dto: UpdateUserDTO): void {
		const errors: ValidationType[] = [];

        if (!dto.id) {
			errors.push({ fields: ['id'], constraint: 'id is required' });
		}

		if (!dto.name || dto.name.length === 0) {
			errors.push({ fields: ['name'], constraint: 'Name is required' });
		}

        if (!dto.email || !REGEX_EMAIL.test(dto.email)) {
            errors.push({ fields: ['email'], constraint: 'Email was not found or does not match with pattern email'})
        }

        if (!dto.password) {
            errors.push({ fields: ['password'], constraint: 'Password is required'})
        }

		if (errors.length > 0) throw AppError.badRequest('Error validating create user', errors);
	}

	public static create(object: Record<string, unknown>): UpdateUserDTO {
		const { id, name, email, password } = object;
		
        return new UpdateUserDTO(
            id as number,
            name as string,
            email as string,
            password as string,
        );
	}
}