import { AppError, ValidationType } from "../../errors/customError";
import { SharedDTO } from "./SharedDTO";

export class CreateAttendancetDTO implements SharedDTO<CreateAttendancetDTO> {
	private constructor(
        public readonly userId: number,
        public readonly eventId: number,
        public readonly status: string,
    ) {
		this.validate(this);
	}

	public validate(dto: CreateAttendancetDTO): void {
		const errors: ValidationType[] = [];

        if (!dto.userId || isNaN(Number(dto.userId))) {
            errors.push({ fields: ['userId'], constraint: 'userId is required'})
        }

        if (!dto.eventId || isNaN(Number(dto.eventId))) {
            errors.push({ fields: ['eventId'], constraint: 'eventId is required'})
        }

		if (errors.length > 0) throw AppError.badRequest('Error validating create attendance', errors);
	}

	public static create(object: Record<string, unknown>): CreateAttendancetDTO {
		const { userId, eventId, status } = object;
		
        return new CreateAttendancetDTO(
            userId as number,
            eventId as number,
            status as string,
        );
	}
}