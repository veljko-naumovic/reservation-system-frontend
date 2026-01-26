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
