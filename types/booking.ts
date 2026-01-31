export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
	id: string;
	title: string;
	dateFrom: string;
	dateTo: string;
	guestName: string;
	status: BookingStatus;
	createdAt: string;
}
