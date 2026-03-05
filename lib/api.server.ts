import "server-only";
import { headers } from "next/headers";
import { Booking } from "@/types/booking";

export const getBookingById = async (id: string): Promise<Booking | null> => {
	try {
		const headersList = await headers();
		const host = headersList.get("host");

		if (!host) return null;

		const protocol = host.includes("localhost") ? "http" : "https";

		const res = await fetch(`${protocol}://${host}/api/bookings?id=${id}`, {
			cache: "no-store",
		});

		if (!res.ok) return null;

		return await res.json();
	} catch {
		return null;
	}
};
