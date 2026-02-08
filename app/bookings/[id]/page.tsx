import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import DeleteBookingButton from "@/components/ui/DeleteBookingButton";
import BookingStatusSelect from "@/components/booking/BookingStatusSelect";
import { getBookingById } from "@/lib/api.server";
import { formatDate, getDuration } from "@/lib/date";

interface Props {
	params: Promise<{ id: string }>;
}
const BookingDetailsPage = async ({ params }: Props) => {
	const { id } = await params;

	const booking = await getBookingById(id);

	if (!booking) {
		notFound();
	}

	return (
		<div className="max-w-2xl mx-auto space-y-6">
			<Link
				href="/bookings"
				className="inline-block text-base text-gray-500 hover:underline"
			>
				← Back to bookings
			</Link>

			<div className="rounded-xl border bg-white p-6 space-y-6">
				{/* Header */}
				<div className="flex items-start justify-between">
					<div>
						<h1 className="text-2xl font-semibold tracking-tight">
							{booking.title}
						</h1>
						<p className="text-base text-gray-500 mt-1">
							Booking details
						</p>
					</div>

					<BookingStatusSelect
						id={booking.id}
						initialStatus={booking.status}
					/>
				</div>

				{/* Info */}
				<div className="grid gap-4 sm:grid-cols-2">
					<div>
						<p className="text-xs uppercase text-gray-400">Guest</p>
						<p className="font-medium">{booking.guestName}</p>
					</div>

					<div>
						<p className="text-xs uppercase text-gray-400">
							Created
						</p>
						<p className="font-medium">
							{formatDate(booking.createdAt)}
						</p>
					</div>

					<div>
						<p className="text-xs uppercase text-gray-400">From</p>
						<p className="font-medium">
							{formatDate(booking.dateFrom)}
						</p>
					</div>

					<div>
						<p className="text-xs uppercase text-gray-400">To</p>
						<p className="font-medium">
							{formatDate(booking.dateTo)}
						</p>
					</div>
				</div>

				{/* Duration */}
				<div className="rounded-lg bg-gray-50 p-4 text-base text-gray-600">
					Stay duration:{" "}
					<span className="font-medium text-gray-900">
						{getDuration(booking.dateFrom, booking.dateTo)} nights
					</span>
				</div>

				{/* Actions */}
				<div className="flex justify-end gap-2">
					<Link href={`/bookings/${booking.id}/edit`}>
						<Button variant="secondary">Edit</Button>
					</Link>

					<DeleteBookingButton booking={booking} />
				</div>
			</div>
		</div>
	);
};

export default BookingDetailsPage;
