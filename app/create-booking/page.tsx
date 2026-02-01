"use client";

import { useRouter } from "next/navigation";
import BookingForm, { BookingFormData } from "@/components/booking/BookingForm";
import { createBooking } from "@/lib/api.client";

export default function CreateBookingPage() {
	const router = useRouter();

	async function handleCreate(data: BookingFormData) {
		if (data.dateFrom > data.dateTo) {
			alert("End date must be after start date");
			return;
		}

		await createBooking(data);
		router.push("/bookings");
	}

	return (
		<section className="max-w-2xl mx-auto space-y-6">
			<h1 className="text-2xl font-semibold">Create booking</h1>
			<BookingForm onSubmit={handleCreate} />
		</section>
	);
}
