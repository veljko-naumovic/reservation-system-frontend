// import { Booking } from "@/types/booking";
// import { BookingFormData } from "@/components/booking/BookingForm";

// export async function getBookings(): Promise<Booking[]> {
// 	const res = await fetch("http://localhost:3000/api/bookings", {
// 		cache: "no-store",
// 	});
// 	if (!res.ok) throw new Error("Failed to fetch bookings");
// 	return res.json();
// }
// export async function createBooking(data: BookingFormData): Promise<Booking> {
// 	const res = await fetch("http://localhost:3000/api/bookings", {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(data),
// 	});

// 	if (!res.ok) {
// 		throw new Error("Failed to create booking");
// 	}

// 	return res.json();
// }

// export async function deleteBooking(id: string) {
// 	const res = await fetch(`/api/bookings?id=${id}`, {
// 		method: "DELETE",
// 	});

// 	if (!res.ok) {
// 		const text = await res.text();
// 		throw new Error(text || "Failed to delete booking");
// 	}

// 	return res.json(); // { id }
// }
// export async function updateBooking(id: string, data: BookingFormData) {
// 	const res = await fetch(`http://localhost:3000/api/bookings?id=${id}`, {
// 		method: "PUT",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(data),
// 	});
// 	if (!res.ok) throw new Error("Failed to update booking");
// 	return res.json();
// }

import { Booking } from "@/types/booking";
import { BookingFormData } from "@/components/booking/BookingForm";

// ✅ GET ALL
export async function getBookings(): Promise<Booking[]> {
	const res = await fetch("/api/bookings", {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch bookings");
	}

	return res.json();
}

// ✅ GET ONE
export async function getBookingById(id: string): Promise<Booking | null> {
	const res = await fetch(`/api/bookings?id=${id}`, {
		cache: "no-store",
	});

	if (!res.ok) return null;
	return res.json();
}

// ✅ CREATE
export async function createBooking(data: BookingFormData): Promise<Booking> {
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

// ✅ UPDATE
export async function updateBooking(
	id: string,
	data: BookingFormData,
): Promise<Booking> {
	const res = await fetch(`/api/bookings?id=${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error("Failed to update booking");
	}

	return res.json();
}

// ✅ DELETE
export async function deleteBooking(id: string): Promise<void> {
	const res = await fetch(`/api/bookings?id=${id}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		throw new Error("Failed to delete booking");
	}
}
