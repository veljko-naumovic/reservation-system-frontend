"use client";

import { useRouter } from "next/navigation";
import { deleteBooking } from "@/lib/api";

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { removeOptimistic, restoreBooking } from "@/store/slices/bookingsSlice";

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
			router.push("/bookings"); //  redirect
		} catch (error) {
			dispatch(restoreBooking(booking));
			alert("Delete failed. Booking restored.");
		}
	}

	return (
		<div className="relative group inline-block">
			<button
				onClick={handleDelete}
				className=" 
					px-3 py-2 rounded
					bg-red-600 text-white
					transition-all duration-150 ease-out
					hover:bg-red-700
					active:scale-95"
			>
				{isDeleting ? "Deleting..." : "Delete"} booking
			</button>

			<div
				className="
					pointer-events-none
					absolute left-1/2 top-full z-10 mt-2
					-translate-x-1/2
					whitespace-nowrap
					rounded bg-gray-900 px-2 py-1
					text-xs text-white
					opacity-0 group-hover:opacity-100
					transition"
			>
				This action cannot be undone
			</div>
		</div>
	);
}
