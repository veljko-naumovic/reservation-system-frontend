"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingForm, { BookingFormData } from "@/components/booking/BookingForm";
import { getBookingById, updateBooking } from "@/lib/api.client";

interface Props {
	params: Promise<{ id: string }>;
}

export default function EditBookingPage({ params }: Props) {
	const { id } = use(params);
	const router = useRouter();

	const [booking, setBooking] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function load() {
			const data = await getBookingById(id);
			setBooking(data);
			setLoading(false);
		}
		load();
	}, [id]);

	async function handleUpdate(data: BookingFormData) {
		if (data.dateFrom > data.dateTo) {
			alert("End date must be after start date");
			return;
		}

		await updateBooking(id, data);
		router.push(`/bookings/${id}`);
	}

	if (loading) {
		return <div className="py-10 text-gray-500">Loading…</div>;
	}

	return (
		<section className="max-w-2xl mx-auto space-y-6">
			<h1 className="text-2xl font-semibold">Edit booking</h1>

			<BookingForm
				initialValues={{
					title: booking.title,
					guestName: booking.guestName,
					dateFrom: booking.dateFrom,
					dateTo: booking.dateTo,
				}}
				onSubmit={handleUpdate}
			/>
		</section>
	);
}
