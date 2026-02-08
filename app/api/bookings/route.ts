import { Booking } from "@/types/booking";
import { NextResponse } from "next/server";

import bookingsData from "../../mock/bookings.json";

let bookings: Booking[] = bookingsData.map((b) => ({
	...b,
	status: b.status as Booking["status"],
}));

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	// Single booking
	if (id) {
		const booking = bookings.find((b) => b.id === id);
		return NextResponse.json(booking ?? null);
	}

	//All bookings
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

export const DELETE = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.json({ error: "Missing id" }, { status: 400 });
	}

	const before = bookings.length;
	bookings = bookings.filter((b) => b.id !== id);

	if (bookings.length === before) {
		return NextResponse.json(
			{ error: "Booking not found" },
			{ status: 404 },
		);
	}

	return NextResponse.json({ id }); // retrun id
};

export const PUT = async (request: Request) => {
	const body = await request.json();
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.json({ error: "Missing id" }, { status: 400 });
	}

	bookings = bookings.map((b) => (b.id === id ? { ...b, ...body } : b));

	return NextResponse.json({ success: true });
};

export const PATCH = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");
	const body = await request.json();

	const booking = bookings.find((b) => b.id === id);
	if (!booking) {
		return NextResponse.json(null, { status: 404 });
	}

	booking.status = body.status;

	return NextResponse.json(booking);
};
