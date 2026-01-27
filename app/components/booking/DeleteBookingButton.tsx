"use client";

import { deleteBooking } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Props {
	id: string;
}

export default function DeleteBookingButton({ id }: Props) {
	const router = useRouter();

	async function handleDelete() {
		const confirmed = confirm(
			"Are you sure you want to delete this booking?",
		);
		if (!confirmed) return;

		await deleteBooking(id);
		router.push("/bookings");
		router.refresh();
	}

	return (
		<button
			onClick={handleDelete}
			className="mt-4 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
		>
			Delete booking
		</button>
	);
}
