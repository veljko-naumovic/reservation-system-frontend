import DeleteBookingButton from "@/app/components/booking/DeleteBookingButton";
import { getBookingById } from "@/lib/api";
import { formatDate, getDuration } from "@/lib/date";

interface Props {
	params: Promise<{ id: string }>;
}

export default async function BookingDetailsPage({ params }: Props) {
	const { id } = await params;

	const booking = await getBookingById(id);

	console.log(booking);

	return (
		<section className="max-w-xl space-y-4">
			<h2 className="text-2xl font-semibold">{booking.title}</h2>

			<div className="text-gray-600">
				Guest: <strong>{booking.guestName}</strong>
			</div>

			<div className="text-gray-600">
				Dates: {formatDate(booking.dateFrom)} →{" "}
				{formatDate(booking.dateTo)}
			</div>

			<div className="text-gray-600">
				Duration: {getDuration(booking.dateFrom, booking.dateTo)} nights
			</div>

			<span className="inline-block text-sm px-3 py-1 rounded bg-yellow-100 text-yellow-700">
				{booking.status}
			</span>
			<DeleteBookingButton id={booking.id} />
		</section>
	);
}
