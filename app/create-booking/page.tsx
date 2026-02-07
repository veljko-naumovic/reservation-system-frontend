"use client";

import { useRouter } from "next/navigation";
import BookingForm, { BookingFormData } from "@/components/booking/BookingForm";
import { createBooking } from "@/lib/api.client";

const CreateBookingPage = () => {
	const router = useRouter();

	const handleCreate = async (data: BookingFormData) => {
		if (data.dateFrom > data.dateTo) {
			alert("End date must be after start date");
			return;
		}

		await createBooking(data);
		router.push("/bookings");
	};

	return (
		<section className="max-w-2xl mx-auto space-y-8">
			<h1 className="text-2xl font-semibold tracking-tight">
				Create booking
			</h1>

			{/* Card */}
			<div className="rounded-xl border bg-white p-6">
				<BookingForm onSubmit={handleCreate} />
			</div>
		</section>
	);
};

export default CreateBookingPage;
