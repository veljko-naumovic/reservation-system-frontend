"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { removeOptimistic, restoreBooking } from "@/store/slices/bookingsSlice";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { deleteBooking } from "@/lib/api.client";

interface Props {
	booking: any;
}

const DeleteBookingButton = ({ booking }: Props) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const [open, setOpen] = useState(false);

	const dispatch = useAppDispatch();
	const router = useRouter();

	const confirmDelete = async () => {
		setIsDeleting(true);

		// optimistic update
		dispatch(removeOptimistic(booking.id));

		try {
			await deleteBooking(booking.id);
			setOpen(false);
			router.push("/bookings");
		} catch {
			dispatch(restoreBooking(booking));
			setIsDeleting(false);
			setOpen(false);
			alert("Delete failed. Booking restored.");
		}
	};

	return (
		<>
			{/* Trigger */}
			<div className="relative group inline-block">
				<Button variant="danger" onClick={() => setOpen(true)}>
					Delete booking
				</Button>

				{/* Tooltip */}
				<div
					className="
            pointer-events-none
            absolute left-1/2 top-full z-10 mt-2
            -translate-x-1/2
            whitespace-nowrap
            rounded bg-gray-900 px-2 py-1
            text-xs text-white
            opacity-0 group-hover:opacity-100
            transition-opacity duration-150
          "
				>
					This action cannot be undone
				</div>
			</div>

			{/* Modal */}
			<Modal
				open={open}
				onClose={() => !isDeleting && setOpen(false)}
				title="Delete booking"
			>
				<p className="text-sm text-gray-600 mb-6">
					Are you sure you want to delete this booking? This action
					cannot be undone.
				</p>

				<div className="flex justify-end gap-3">
					<Button
						variant="secondary"
						onClick={() => setOpen(false)}
						disabled={isDeleting}
					>
						Cancel
					</Button>

					<Button
						variant="danger"
						onClick={confirmDelete}
						disabled={isDeleting}
					>
						{isDeleting ? "Deleting..." : "Delete"}
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default DeleteBookingButton;
