import { AppError, ValidationType } from "../../errors/customError";
import { SharedDTO } from "./SharedDTO";

export class GetByIdLocationDTO implements SharedDTO<GetByIdLocationDTO> {
	private constructor(
        public readonly id: number,
    ) {
		this.validate(this);
	}

	public validate(dto: GetByIdLocationDTO): void {
		const errors: ValidationType[] = [];

        if (!dto.id || isNaN(Number(dto.id))) {
            errors.push({ fields: ['id'], constraint: 'Id is required or it may be invalid'})
        }

		if (errors.length > 0) throw AppError.badRequest('Error validating get location', errors);
	}

	public static create(object: Record<string, unknown>): GetByIdLocationDTO {
		const { id } = object;
		
        return new GetByIdLocationDTO(
            id as number
        );
	}
}