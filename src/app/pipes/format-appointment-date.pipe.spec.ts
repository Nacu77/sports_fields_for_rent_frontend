import { FormatAppointmentDatePipe } from './format-appointment-date.pipe';

describe('FormatAppointmentDatePipe', () => {
  it('create an instance', () => {
    const pipe = new FormatAppointmentDatePipe();
    expect(pipe).toBeTruthy();
  });
});
