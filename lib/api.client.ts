import { Booking } from "@/types/booking";
import { BookingFormData } from "@/components/booking/BookingForm";

// ✅ GET ALL
export const getBookings = async (): Promise<Booking[]> => {
	const res = await fetch("/api/bookings", {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch bookings");
	}

	return res.json();
};

// ✅ GET ONE
export const getBookingById = async (id: string): Promise<Booking | null> => {
	const res = await fetch(`/api/bookings?id=${id}`, {
		cache: "no-store",
	});

	if (!res.ok) return null;
	return res.json();
};

// ✅ CREATE
export const createBooking = async (
	data: BookingFormData,
): Promise<Booking> => {
	const res = await fetch("/api/bookings", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error("Failed to create booking");
	}

	return res.json();
};

// ✅ UPDATE
export const updateBooking = async (
	id: string,
	data: BookingFormData,
): Promise<Booking> => {
	const res = await fetch(`/api/bookings?id=${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error("Failed to update booking");
	}

	return res.json();
};

// ✅ DELETE
export const deleteBooking = async (id: string): Promise<void> => {
	const res = await fetch(`/api/bookings?id=${id}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		throw new Error("Failed to delete booking");
	}
};
