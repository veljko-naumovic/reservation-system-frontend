import "server-only";
import { headers } from "next/headers";
import { Booking } from "@/types/booking";

export const getBookingById = async (id: string): Promise<Booking | null> => {
	try {
		const headersList = await headers();

		const host =
			headersList.get("x-forwarded-host") || headersList.get("host");

		if (!host) {
			console.error("HOST not found");
			return null;
		}

		const protocol = process.env.VERCEL ? "https" : "http";

		const url = `${protocol}://${host}/api/bookings?id=${id}`;

		console.log("FETCH URL:", url);

		const res = await fetch(url, {
			cache: "no-store",
		});

		console.log("RESPONSE STATUS:", res.status);

		if (!res.ok) return null;

		const booking: Booking = await res.json();

		console.log("BOOKING FROM API:", booking);

		return booking;
	} catch (error) {
		console.error("FETCH ERROR:", error);
		return null;
	}
};
