import { getBookings } from "@/app/lib/api";

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
						<li key={b.id} className="border rounded p-4 bg-white">
							<div className="font-medium">{b.title}</div>
							<div className="text-sm text-gray-500">
								{b.guestName} • {b.dateFrom} → {b.dateTo}
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
