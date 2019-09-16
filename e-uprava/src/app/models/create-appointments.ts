import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Period } from './periods';

export interface CreateAppointment {
    purpose: string;
    ngbDate: NgbDate;
    period: Period;
}

