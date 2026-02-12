import { Booking } from "@/types/booking";
import { NextResponse } from "next/server";
import bookingsData from "../../mock/bookings.json";

const globalForBookings = globalThis as unknown as {
	bookings: Booking[];
};

if (!globalForBookings.bookings) {
	globalForBookings.bookings = bookingsData.map((b) => ({
		...b,
		status: b.status as Booking["status"],
	}));
}

let bookings = globalForBookings.bookings;

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	// SINGLE BOOKING
	if (id) {
		const booking = bookings.find((b) => b.id === id);
		return NextResponse.json(booking ?? null);
	}

	// ALL BOOKINGS
	return NextResponse.json(bookings);
};

export const POST = async (req: Request) => {
	const body = await req.json();

	const newBooking: Booking = {
		id: crypto.randomUUID(),
		...body,
		status: "pending",
		createdAt: new Date().toISOString(),
	};

	bookings.push(newBooking);

	return NextResponse.json(newBooking, { status: 201 });
};

export const PUT = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");
	const body = await request.json();

	const index = bookings.findIndex((b) => b.id === id);

	if (index === -1) {
		return NextResponse.json(
			{ message: "Booking not found" },
			{ status: 404 },
		);
	}

	bookings[index] = {
		...bookings[index],
		...body,
	};

	return NextResponse.json(bookings[index]);
};

export const PATCH = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");
	const body = await request.json();

	const booking = bookings.find((b) => b.id === id);

	if (!booking) {
		return NextResponse.json(
			{ message: "Booking not found" },
			{ status: 404 },
		);
	}

	booking.status = body.status;

	return NextResponse.json(booking);
};

export const DELETE = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	const index = bookings.findIndex((b) => b.id === id);

	if (index === -1) {
		return NextResponse.json(
			{ message: "Booking not found" },
			{ status: 404 },
		);
	}

	bookings.splice(index, 1);

	return NextResponse.json({ success: true });
};
