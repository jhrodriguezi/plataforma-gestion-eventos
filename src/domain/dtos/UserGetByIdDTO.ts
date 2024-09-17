import { AppError, ValidationType } from "../../errors/customError";
import { SharedDTO } from "./SharedDTO";

export class GetByIdUserDTO implements SharedDTO<GetByIdUserDTO> {
	private constructor(
        public readonly id: number
    ) {
		this.validate(this);
	}

	public validate(dto: GetByIdUserDTO): void {
		const errors: ValidationType[] = [];

		if (!dto.id) {
			errors.push({ fields: ['id'], constraint: 'id is required' });
		}

		if (errors.length > 0) throw AppError.badRequest('Error validating get user', errors);
	}

	public static create(object: Record<string, unknown>): GetByIdUserDTO {
		const { id } = object;
		
        return new GetByIdUserDTO(
            id as number
        );
	}
}