export interface IMapService {
    getDataFromAddress(address: string): Promise<LocationData>
    getNearbyPlaces(latitude: number, longitude: number, radius: number, limit: number): Promise<LocationData[]>
}

export interface LocationData {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    city: string;
    country: string;
    postalCode: string;
}