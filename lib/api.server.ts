import "server-only";
import { Booking } from "@/types/booking";

export const getBookingById = async (id: string): Promise<Booking | null> => {
	const res = await fetch(`http://localhost:3000/api/bookings?id=${id}`, {
		cache: "no-store",
	});

	if (!res.ok) return null;
	return res.json();
};
