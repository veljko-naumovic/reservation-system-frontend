import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Header() {
	return (
		<header className="border-b bg-white">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<span className="font-semibold">Booking App</span>

				<nav className="flex items-center gap-4 text-sm">
					<Link
						href="/bookings"
						className="text-gray-700 hover:underline"
					>
						Bookings
					</Link>

					<Link
						href="/create-booking"
						className="
							px-3 py-2 rounded
							text-sm font-medium
						  text-gray-700
						  bg-gray-100
							transition"
					>
						New booking
					</Link>

					<Link
						href="/about"
						className="text-gray-500 hover:underline"
					>
						About
					</Link>
				</nav>
			</div>
		</header>
	);
}
