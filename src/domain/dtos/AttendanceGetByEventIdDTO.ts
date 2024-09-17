import { AppError, ValidationType } from "../../errors/customError";
import { SharedDTO } from "./SharedDTO";

export class GetAttendanceByEventIdDTO implements SharedDTO<GetAttendanceByEventIdDTO> {
	private constructor(
        public readonly eventId: number,
    ) {
		this.validate(this);
	}

	public validate(dto: GetAttendanceByEventIdDTO): void {
		const errors: ValidationType[] = [];

        if (!dto.eventId || isNaN(Number(dto.eventId))) {
            errors.push({ fields: ['eventId'], constraint: 'eventId is required'})
        }

		if (errors.length > 0) throw AppError.badRequest('Error validating get attendance by event id', errors);
	}

	public static create(object: Record<string, unknown>): GetAttendanceByEventIdDTO {
		const { eventId } = object;
		
        return new GetAttendanceByEventIdDTO(
            eventId as number,
        );
	}
}