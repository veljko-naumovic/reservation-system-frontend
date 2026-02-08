"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingForm, { BookingFormData } from "@/components/booking/BookingForm";
import { getBookingById, updateBooking } from "@/lib/api.client";

interface Props {
	params: Promise<{ id: string }>;
}

const EditBookingPage = ({ params }: Props) => {
	const { id } = use(params);
	const router = useRouter();

	const [booking, setBooking] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			const data = await getBookingById(id);
			setBooking(data);
			setLoading(false);
		};
		load();
	}, [id]);

	const handleUpdate = async (data: BookingFormData) => {
		if (data.dateFrom > data.dateTo) {
			alert("End date must be after start date");
			return;
		}

		await updateBooking(id, data);
		router.push(`/bookings/${id}`);
	};

	if (loading) {
		return <div className="py-10 text-gray-500">Loading…</div>;
	}

	return (
		<section className="max-w-2xl mx-auto space-y-8">
			<h1 className="text-2xl font-semibold tracking-tight">
				Edit booking
			</h1>

			{/* Card – ISTO kao Create */}
			<div className="rounded-xl border bg-white p-6">
				<BookingForm
					initialData={{
						title: booking.title,
						guestName: booking.guestName,
						dateFrom: booking.dateFrom,
						dateTo: booking.dateTo,
					}}
					onSubmit={handleUpdate}
				/>
			</div>
		</section>
	);
};

export default EditBookingPage;
