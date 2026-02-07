import Link from "next/link";

const HomePage = () => {
	return (
		<section className="space-y-6">
			<h1 className="text-3xl font-bold">Booking & Reservation App</h1>

			<p className="text-gray-600 max-w-xl">
				Simple demo application for managing bookings and reservations.
				Built with Next.js, TypeScript and Tailwind CSS.
			</p>

			<div className="flex gap-4">
				<Link
					href="/bookings"
					className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
				>
					View bookings
				</Link>

				<Link
					href="/create-booking"
					className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
				>
					Create booking
				</Link>
			</div>
		</section>
	);
};

export default HomePage;
