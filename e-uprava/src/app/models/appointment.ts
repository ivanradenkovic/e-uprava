import { AppointmentStatus } from '../enums/appointment-status';

export interface Appointment {
    key: string;
    purpose: string;
    date: number;
    status?: AppointmentStatus;
    createdBy?: string;
    repliedBy?: string;

    replyMessage?: string;
}

