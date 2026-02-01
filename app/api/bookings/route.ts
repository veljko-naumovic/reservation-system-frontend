import { Booking } from "@/types/booking";
import { NextResponse } from "next/server";

import bookingsData from "../../mock/bookings.json";

let bookings: Booking[] = bookingsData.map((b) => ({
	...b,
	status: b.status as Booking["status"],
}));

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	// SINGLE BOOKING
	if (id) {
		const booking = bookings.find((b) => b.id === id);
		return NextResponse.json(booking ?? null);
	}

	// ALL BOOKINGS
	return NextResponse.json(bookings);
}
export async function POST(req: Request) {
	const body = await req.json();

	const newBooking: Booking = {
		id: crypto.randomUUID(),
		...body,
		status: "pending",
		createdAt: new Date().toISOString(),
	};

	bookings.push(newBooking);

	return NextResponse.json(newBooking, { status: 201 });
}

export async function DELETE(request: Request) {
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

	return NextResponse.json({ id }); // vrati id (korisno za frontend)
}

export async function PUT(request: Request) {
	const body = await request.json();
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.json({ error: "Missing id" }, { status: 400 });
	}

	bookings = bookings.map((b) => (b.id === id ? { ...b, ...body } : b));

	return NextResponse.json({ success: true });
}
