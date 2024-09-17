import axios from "axios";
import { IMapService, LocationData } from "../../domain/interfaces/IMapService";
import { AppError } from "../../errors/customError";

export class MapBoxService implements IMapService {
    
    async getDataFromAddress(address: string): Promise<LocationData> {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;
        const params = {
            access_token: process.env.MAPBOX_ACCESS_TOKEN
        };
        let location: LocationData;
        try {
            const response = await axios.get(url, { params });
            location = this.extractRelevantData(response.data.features[0])
        } catch (e) {
            throw AppError.internalServer(`Failed to retrieve coordinates due to ${e?.toString()}`)
        }
        return location;
    }

    async getNearbyPlaces(latitude: number, longitude: number, radius: number = 50, limit: number = 50): Promise<LocationData[]> {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`;
        const params = {
            proximity: `${longitude},${latitude}`,
            types: 'poi',
            limit: limit,
            radius: radius,
            access_token: process.env.MAPBOX_ACCESS_TOKEN
        };
        const locations: LocationData[] = []
        try {
            const response = await axios.get(url, { params });
            console.log(response.data.features)
            response.data.features.forEach((feat: any) => {
                locations.push(this.extractRelevantData(feat))
            })
        } catch (e) {
            throw AppError.internalServer(`Failed to retrieve nearby places due to ${e?.toString()}`)
        }
        return locations;
    }

    private extractRelevantData(feature: any): LocationData {
        const place_name = feature.place_name.split(',').map((part: string) => part.trim());
        const country = place_name.pop() || '';
        let city = '';
        let postalCode = '';
        const secondLastPart = place_name.pop() || '';
        const cityParts = secondLastPart.split(' ');
        if (cityParts.length > 1 && /^\d+$/.test(cityParts[cityParts.length - 1])) {
            postalCode = cityParts.pop() || '';
            city = cityParts[0];
        } else {
            postalCode = cityParts[0];
            city = cityParts[1];
        }
        const address = place_name.pop();

        return {
            name: feature.text,
            address: address,
            latitude: feature.center[1] as number,
            longitude: feature.center[0] as number,
            city: city,
            country: country,
            postalCode: postalCode
        }
    }

}