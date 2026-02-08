"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBookingStatus } from "@/lib/api.client";
import { BookingStatus } from "@/types/booking";

interface Props {
	id: string;
	initialStatus: BookingStatus;
}

const statusStyles = (status: BookingStatus) => {
	switch (status) {
		case "confirmed":
			return "bg-green-100 text-green-700";
		case "cancelled":
			return "bg-red-100 text-red-700";
		default:
			return "bg-yellow-100 text-yellow-700";
	}
};

const BookingStatusSelect = ({ id, initialStatus }: Props) => {
	const [status, setStatus] = useState(initialStatus);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const next = e.target.value as BookingStatus;
		setStatus(next);
		setLoading(true);

		try {
			await updateBookingStatus(id, next);
			router.refresh(); // 🔥 refetch server page
		} finally {
			setLoading(false);
		}
	};

	return (
		<select
			value={status}
			onChange={handleChange}
			disabled={loading}
			className={`text-sm px-3 py-1 rounded-full border cursor-pointer ${statusStyles(
				status,
			)}`}
		>
			<option value="pending">Pending</option>
			<option value="confirmed">Confirmed</option>
			<option value="cancelled">Cancelled</option>
		</select>
	);
};

export default BookingStatusSelect;
