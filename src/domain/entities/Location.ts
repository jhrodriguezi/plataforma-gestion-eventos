export class Location {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    city: string;
    country: string;
    postal_code: string;

    constructor(
        id: number,
        name: string,
        address: string,
        latitude: number,
        longitude: number,
        city: string,
        country: string,
        postal_code: string = 'N/A'
    ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
        this.country = country;
        this.postal_code = postal_code;
    }
}