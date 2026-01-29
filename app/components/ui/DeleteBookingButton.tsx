"use client";

import { useRouter } from "next/navigation";
import { deleteBooking } from "@/lib/api";
import { useAppDispatch } from "@/app/store/hooks";
import {
	removeOptimistic,
	restoreBooking,
} from "@/app/store/slices/bookingsSlice";
import { useState } from "react";

interface Props {
	booking: any;
}

export default function DeleteBookingButton({ booking }: Props) {
	const [isDeleting, setIsDeleting] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();

	async function handleDelete() {
		setIsDeleting(true);
		const confirmed = confirm(
			"Are you sure you want to delete this booking?",
		);
		if (!confirmed) return;

		dispatch(removeOptimistic(booking.id));

		try {
			await deleteBooking(booking.id);
			router.push("/bookings"); // 👈 redirect
		} catch (error) {
			dispatch(restoreBooking(booking));
			alert("Delete failed. Booking restored.");
		}
	}

	return (
		<button
			onClick={handleDelete}
			className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
		>
			{isDeleting ? "Deleting..." : "Delete"}
		</button>
	);
}
