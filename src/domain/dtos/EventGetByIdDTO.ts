import { AppError, ValidationType } from "../../errors/customError";
import { SharedDTO } from "./SharedDTO";

export class GetByIdEventDTO implements SharedDTO<GetByIdEventDTO> {
	private constructor(
        public readonly id: number,
    ) {
		this.validate(this);
	}

	public validate(dto: GetByIdEventDTO): void {
		const errors: ValidationType[] = [];

        if (!dto.id || isNaN(Number(dto.id)) || dto.id < 0) {
            errors.push({ fields: ['id'], constraint: 'Id is required or it may be invalid'})
        }

		if (errors.length > 0) throw AppError.badRequest('Error validating get event', errors);
	}

	public static create(object: Record<string, unknown>): GetByIdEventDTO {
		const { id } = object;
		
        return new GetByIdEventDTO(
            id as number
        );
	}
}