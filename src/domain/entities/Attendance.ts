class Attendance {
    id: number;
    userId: number;
    eventId: number;
    registrationDate: Date;
    status: 'PENDING' | string;
  
    constructor(id: number, userId: number, eventId: number, registrationDate: Date = new Date(), status: 'PENDING' | string = 'PENDING') {
      this.id = id;
      this.userId = userId;
      this.eventId = eventId;
      this.registrationDate = registrationDate;
      this.status = status;
    }
  }