import { Booking } from "../app/types/booking";

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

export async function getBookingById(id: string): Promise<Booking> {
	const res = await fetch(`http://localhost:3000/api/bookings?id=${id}`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Booking not found");
	}
	const data: Booking[] = await res.json();
	return data[0];
}

export async function deleteBooking(id: string) {
	const res = await fetch(`http://localhost:3000/api/bookings?id=${id}`, {
		method: "DELETE",
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to delete booking");
	}

	return res.json();
}

await new Promise((r) => setTimeout(r, 1500));
