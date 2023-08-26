export interface Appointment {
  id: string;
  sportFieldId: string;
  createdBy: string | null;
  startDateTime: string;
  endDateTime: string;
  sportFieldName: string;
}
