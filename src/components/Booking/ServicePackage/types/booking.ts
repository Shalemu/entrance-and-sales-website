export type BookingData = {
  bookingDate: string;
  startTime: string;
  endTime: string;
  participants: number;
  adults?: number;
  children?: number;
};