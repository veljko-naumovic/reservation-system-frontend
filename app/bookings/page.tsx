import { formatDate, getDuration } from "../../lib/date";
import { getBookings } from "../../lib/api";
import Link from "next/link";

export default async function BookingsPage() {
	const bookings = await getBookings();

	return (
		<section>
			<h2 className="text-2xl font-semibold mb-4">Bookings</h2>

			{bookings.length === 0 ? (
				<p className="text-gray-500">No bookings yet.</p>
			) : (
				<ul className="space-y-3">
					{bookings.map((b) => (
						<li
							key={b.id}
							className="border rounded p-4 bg-white flex justify-between items-center"
						>
							<div>
								<Link
									href={`/bookings/${b.id}`}
									className="font-medium hover:underline"
								>
									{b.title}
								</Link>

								<div className="text-sm text-gray-500">
									{b.guestName} • {formatDate(b.dateFrom)} →{" "}
									{formatDate(b.dateTo)}
								</div>

								<span className="text-xs text-gray-400">
									{getDuration(b.dateFrom, b.dateTo)} nights
								</span>
							</div>

							<span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">
								{b.status}
							</span>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
