import "server-only";
import { headers } from "next/headers";
import { Booking } from "@/types/booking";

export const getBookingById = async (id: string): Promise<Booking | null> => {
	try {
		const headersList = await headers();
		const host = headersList.get("host");

		if (!host) return null;

		const protocol = host.includes("localhost") ? "http" : "https";

		const url = `${protocol}://${host}/api/bookings?id=${id}`;

		const res = await fetch(url, {
			cache: "no-store",
		});

		if (!res.ok) return null;

		const booking = await res.json();

		return booking;
	} catch (error) {
		console.error("FETCH ERROR:", error);
		return null;
	}
};
