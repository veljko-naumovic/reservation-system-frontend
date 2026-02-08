import { Booking } from "@/types/booking";
import { BookingFormData } from "@/components/booking/BookingForm";

// Get all
export const getBookings = async (): Promise<Booking[]> => {
	const res = await fetch("/api/bookings", {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch bookings");
	}

	return res.json();
};

// Get one
export const getBookingById = async (id: string): Promise<Booking | null> => {
	const res = await fetch(`/api/bookings?id=${id}`, {
		cache: "no-store",
	});

	if (!res.ok) return null;
	return res.json();
};

// Create
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

// Update booking
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

// Delete
export const deleteBooking = async (id: string): Promise<void> => {
	const res = await fetch(`/api/bookings?id=${id}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		throw new Error("Failed to delete booking");
	}
};

// Update status

export const updateBookingStatus = async (
	id: string,
	status: "pending" | "confirmed" | "cancelled",
) => {
	const res = await fetch(`/api/bookings?id=${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ status }),
	});

	if (!res.ok) {
		throw new Error("Failed to update status");
	}

	return res.json();
};
