import { Booking } from "../types/booking";

export async function getBookings(): Promise<Booking[]> {
	const res = await fetch("http://localhost:3000/api/bookings", {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch bookings");
	}

	return res.json();
}

export async function createBooking(
	data: Omit<Booking, "id" | "status" | "createdAt">,
) {
	const res = await fetch("/api/bookings", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error("Failed to create booking");
	}

	return res.json();
}
