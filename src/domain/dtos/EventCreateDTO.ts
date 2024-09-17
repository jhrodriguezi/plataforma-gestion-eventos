import { AppError, ValidationType } from "../../errors/customError";
import { SharedDTO } from "./SharedDTO";

export class CreateEventDTO implements SharedDTO<CreateEventDTO> {
	private constructor(
        public readonly user_id: number,
        public readonly location_id: number,
        public readonly name: string,
        public readonly date_time: Date,
        public readonly status: string,
        public readonly description?: string,
        public readonly capacity?: number,
    ) {
		this.validate(this);
	}

	public validate(dto: CreateEventDTO): void {
		const errors: ValidationType[] = [];

        if (!dto.user_id) {
            errors.push({ fields: ['user_id'], constraint: 'User is required'})
        }

        if (!dto.location_id) {
            errors.push({ fields: ['location_id'], constraint: 'Location is required'})
        }

		if (!dto.name || dto.name.length === 0) {
			errors.push({ fields: ['name'], constraint: 'Name is required' });
		}

        if (!dto.date_time) {
            errors.push({ fields: ['date_time'], constraint: 'Date time is required'})
        }

        if (!dto.status) {
            errors.push({ fields: ['status'], constraint: 'Status is required'})
        }

		if (errors.length > 0) throw AppError.badRequest('Error validating create event', errors);
	}

	public static create(object: Record<string, unknown>): CreateEventDTO {
		const { user_id, location_id, name, date_time, status, description, capacity } = object;
		
        return new CreateEventDTO(
            user_id as number,
            location_id as number,
            name as string,
            date_time as Date,
            status as string,
            description as string,
            capacity as number
        );
	}
}