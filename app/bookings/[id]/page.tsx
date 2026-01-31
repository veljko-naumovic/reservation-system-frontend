import DeleteBookingButton from "@/components/ui/DeleteBookingButton";
import { getBookingById } from "@/lib/api";
import { formatDate, getDuration } from "@/lib/date";

interface Props {
	params: Promise<{ id: string }>;
}

function statusStyles(status: string) {
	switch (status) {
		case "confirmed":
			return "bg-green-100 text-green-700";
		case "cancelled":
			return "bg-red-100 text-red-700";
		default:
			return "bg-yellow-100 text-yellow-700";
	}
}

export default async function BookingDetailsPage({ params }: Props) {
	const { id } = await params;
	const booking = await getBookingById(id);

	return (
		<div className="max-w-2xl mx-auto">
			{/* Card */}
			<div className="rounded-xl border bg-white p-6 space-y-6">
				{/* Header */}
				<div className="flex items-start justify-between">
					<div>
						<h1 className="text-2xl font-semibold tracking-tight">
							{booking.title}
						</h1>
						<p className="text-sm text-gray-500 mt-1">
							Booking details
						</p>
					</div>

					<div className="relative group">
						<span
							className={`text-xs px-2 py-1 rounded-full cursor-help ${statusStyles(
								booking.status,
							)}`}
						>
							{booking.status}
						</span>

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
							{booking.status === "pending" &&
								"Waiting for confirmation"}
							{booking.status === "confirmed" &&
								"Booking is confirmed"}
							{booking.status === "cancelled" &&
								"Booking was cancelled"}
						</div>
					</div>
				</div>

				{/* Info grid */}
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
				<div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
					Stay duration:{" "}
					<span className="font-medium text-gray-900">
						{getDuration(booking.dateFrom, booking.dateTo)} nights
					</span>
				</div>

				{/* Actions */}
				<div className="flex justify-end">
					<DeleteBookingButton booking={booking} />
				</div>
			</div>
		</div>
	);
}
