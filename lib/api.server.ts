import "server-only";
import { Booking } from "@/types/booking";

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

console.log("BASE URL:", baseUrl);
console.log("VERCEL_URL:", process.env.VERCEL_URL);

export const getBookingById = async (id: string): Promise<Booking | null> => {
	const res = await fetch(`${baseUrl}/api/bookings?id=${id}`, {
		cache: "no-store",
	});

	if (!res.ok) return null;
	return res.json();
};
