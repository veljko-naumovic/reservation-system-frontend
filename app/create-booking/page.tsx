"use client";

import { useRouter } from "next/navigation";
import BookingForm from "@/components/booking/BookingForm";
import { createBooking } from "@/lib/api";

export default function CreateBookingPage() {
	const router = useRouter();

	async function handleCreate(data: {
		title: string;
		guestName: string;
		dateFrom: string;
		dateTo: string;
	}) {
		if (data.dateFrom > data.dateTo) {
			alert("End date must be after start date");
			return;
		}

		await createBooking(data);
		router.push("/bookings");
	}

	return <BookingForm onSubmit={handleCreate} />;
}
