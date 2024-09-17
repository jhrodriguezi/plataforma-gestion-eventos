import { AppError, ValidationType } from "../../errors/customError";
import { SharedDTO } from "./SharedDTO";

export class DeleteEventDTO implements SharedDTO<DeleteEventDTO> {
	private constructor(
        public readonly id: number,
    ) {
		this.validate(this);
	}

	public validate(dto: DeleteEventDTO): void {
		const errors: ValidationType[] = [];

        if (!dto.id || isNaN(Number(dto.id))) {
            errors.push({ fields: ['id'], constraint: 'Id is required or it may be invalid'})
        }

		if (errors.length > 0) throw AppError.badRequest('Error validating update event', errors);
	}

	public static create(object: Record<string, unknown>): DeleteEventDTO {
		const { id } = object;
		
        return new DeleteEventDTO(
            id as number
        );
	}
}