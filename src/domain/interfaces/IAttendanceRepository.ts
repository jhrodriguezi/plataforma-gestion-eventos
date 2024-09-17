import { CreateAttendancetDTO } from "../dtos/AttendanceCreateDTO";
import { GetAttendanceByEventIdDTO } from "../dtos/AttendanceGetByEventIdDTO";

export interface IAttendanceRepository {
    findAttendanceByEventId(data: GetAttendanceByEventIdDTO): Promise<Attendance | null>;
    create(data: CreateAttendancetDTO): Promise<Attendance>;
}