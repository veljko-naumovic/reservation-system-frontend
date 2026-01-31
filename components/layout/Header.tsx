import Link from "next/link";

export default function Header() {
	return (
		<header className="border-b bg-white">
			<div className="container mx-auto flex items-center justify-between px-4 py-4">
				<Link
					href="/bookings"
					className="text-lg font-semibold tracking-tight"
				>
					Booking App
				</Link>

				<nav className="flex items-center gap-4 text-sm text-gray-600">
					<Link
						href="/bookings"
						className="hover:text-gray-900 transition-colors"
					>
						Bookings
					</Link>

					<Link
						href="/create-booking"
						className="hover:text-gray-900 transition-colors"
					>
						New booking
					</Link>
				</nav>
			</div>
		</header>
	);
}
