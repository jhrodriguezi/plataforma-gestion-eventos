export class NearbyPlace {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    type: string;

    constructor(
        id: number,
        name: string,
        latitude: number,
        longitude: number,
        type: string = 'N/A'
    ) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.type = type;
    }
}