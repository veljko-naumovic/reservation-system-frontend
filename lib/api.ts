// import { Booking } from "@/types/booking";
// import { headers } from "next/headers";
// import "server-only";
// export async function getBookings(): Promise<Booking[]> {
// 	const res = await fetch("http://localhost:3000/api/bookings", {
// 		cache: "no-store",
// 	});

// 	if (!res.ok) {
// 		throw new Error("Failed to fetch bookings");
// 	}

// 	return res.json();
// }

// export async function createBooking(
// 	data: Omit<Booking, "id" | "status" | "createdAt">,
// ) {
// 	const res = await fetch("/api/bookings", {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(data),
// 	});

// 	if (!res.ok) {
// 		throw new Error("Failed to create booking");
// 	}

// 	return res.json();
// }

// export async function getBookingById(id: string): Promise<Booking | null> {
// 	const headersList = await headers();
// 	const host = headersList.get("host");

// 	if (!host) {
// 		throw new Error("Host header is missing");
// 	}

// 	const res = await fetch(`http://${host}/api/bookings?id=${id}`, {
// 		cache: "no-store",
// 	});

// 	if (!res.ok) return null;
// 	return res.json();
// }

// export async function deleteBooking(id: string) {
// 	const res = await fetch(`http://localhost:3000/api/bookings?id=${id}`, {
// 		method: "DELETE",
// 		cache: "no-store",
// 	});

// 	if (!res.ok) {
// 		throw new Error("Failed to delete booking");
// 	}

// 	return res.json();
// }

// import { BookingFormData } from "@/components/booking/BookingForm";

// export async function updateBooking(id: string, data: BookingFormData) {
// 	const res = await fetch(`/api/bookings?id=${id}`, {
// 		method: "PUT",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(data),
// 	});

// 	if (!res.ok) {
// 		throw new Error("Failed to update booking");
// 	}

// 	return res.json();
// }

// // await new Promise((r) => setTimeout(r, 1500));
