import { Booking } from "@/app/types/booking";
import { NextResponse } from "next/server";

let bookings: Booking[] = [];

export async function GET() {
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

export async function DELETE(req: Request) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.json(
			{ message: "ID is required" },
			{ status: 400 },
		);
	}

	bookings = bookings.filter((b) => b.id !== id);

	return NextResponse.json({ success: true });
}
