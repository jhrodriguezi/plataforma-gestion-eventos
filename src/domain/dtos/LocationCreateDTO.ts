import { AppError, ValidationType } from "../../errors/customError";
import { SharedDTO } from "./SharedDTO";

export class CreateLocationDTO implements SharedDTO<CreateLocationDTO> {
	private constructor(
        public readonly name: string,
        public readonly address: string,
        public readonly latitude: number,
        public readonly longitude: number,
        public readonly city: string,
        public readonly country: string,
        public readonly postal_code: string
    ) {
		this.validate(this);
	}

	public validate(dto: CreateLocationDTO): void {
		const errors: ValidationType[] = [];

        if (!dto.name) {
            errors.push({ fields: ['name'], constraint: 'Name is required' });
        }

        if (!dto.address) {
            errors.push({ fields: ['address'], constraint: 'Address is required' });
        }

        if (typeof dto.latitude !== 'number' || isNaN(dto.latitude)) {
            errors.push({ fields: ['latitude'], constraint: 'Latitude must be a valid number' });
        }

        if (typeof dto.longitude !== 'number' || isNaN(dto.longitude)) {
            errors.push({ fields: ['longitude'], constraint: 'Longitude must be a valid number' });
        }

        if (!dto.city) {
            errors.push({ fields: ['city'], constraint: 'City is required' });
        }

        if (!dto.country) {
            errors.push({ fields: ['country'], constraint: 'Country is required' });
        }

        if (!dto.postal_code) {
            errors.push({ fields: ['postal_code'], constraint: 'Postal code is required' });
        }

		if (errors.length > 0) {
            throw AppError.badRequest('Error validating create location', errors);
        }
	}

	public static create(object: Record<string, unknown>): CreateLocationDTO {
		const { name, address, latitude, longitude, city, country, postal_code } = object;
		
        return new CreateLocationDTO(
            name as string,
            address as string,
            latitude as number,
            longitude as number, 
            city as string,
            country as string,
            postal_code as string
        );
	}
}