import Link from "next/link";
import { Booking } from "@/types/booking";
import { formatDate, getDuration } from "@/lib/date";

const statusStyles = (status: Booking["status"]) => {
	switch (status) {
		case "confirmed":
			return "border-l-green-400";
		case "cancelled":
			return "border-l-red-400";
		default:
			return "border-l-yellow-400";
	}
};

interface Props {
	booking: Booking;
}

const BookingCard = ({ booking }: Props) => {
	return (
		<li
			className="
				rounded-lg border border-l-4 border-l-gray-200
				bg-white p-4
				transition-all duration-150 ease-out
				hover:shadow-md hover:-translate-y-0.5"
		>
			<div className="space-y-2">
				<Link
					href={`/bookings/${booking.id}`}
					className="text-lg font-medium transition-colors hover:underline"
				>
					{booking.title}
				</Link>

				<div className="text-sm text-gray-600">{booking.guestName}</div>

				<div className="text-sm text-gray-500">
					{formatDate(booking.dateFrom)} →{" "}
					{formatDate(booking.dateTo)}
					<span className="ml-1 text-gray-400">
						({getDuration(booking.dateFrom, booking.dateTo)} nights)
					</span>
				</div>
			</div>

			<div className="mt-4 flex items-center justify-between">
				<span
					className={`text-xs px-2 py-1 rounded-full transition-colors ${statusStyles(
						booking.status,
					)}`}
				>
					{booking.status}
				</span>

				<span className="text-xs text-gray-400">
					Created {formatDate(booking.createdAt)}
				</span>
			</div>
		</li>
	);
};

export default BookingCard;
