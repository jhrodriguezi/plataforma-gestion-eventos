export class Event {
    id: number;
    user_id: number;
    location_id: number;
    name: string;
    description?: string;
    date_time: Date;
    capacity?: number;
    status: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(
        id: number,
        user_id: number,
        location_id: number,
        name: string,
        date_time: Date,
        status: string,
        description?: string,
        capacity?: number,
        created_at?: Date,
        updated_at?: Date
    ) {
        this.id = id;
        this.user_id = user_id;
        this.location_id = location_id;
        this.name = name;
        this.date_time = date_time;
        this.status = status;
        this.description = description;
        this.capacity = capacity;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}