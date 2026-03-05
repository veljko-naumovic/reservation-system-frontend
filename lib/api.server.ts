import "server-only";
import { Booking } from "@/types/booking";

export const getBookingById = async (id: string): Promise<Booking | null> => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings?id=${id}`,
		{
			cache: "no-store",
		},
	);

	if (!res.ok) return null;
	return res.json();
};
