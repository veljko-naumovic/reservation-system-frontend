"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLink =
	"relative px-1 text-base text-gray-700 \
   after:absolute after:left-0 after:-bottom-1 \
   after:h-[2px] after:w-full after:bg-gray-400 \
   after:origin-left after:scale-x-0 \
   after:transition-transform after:duration-200 \
   hover:after:scale-x-100 \
   focus-visible:outline-none \
   focus-visible:after:scale-x-100";

const navLinkActive = "text-gray-900 after:scale-x-100";

// Active route helper

const isActive = (pathname: string, href: string) => {
	if (href === "/bookings") {
		return pathname === "/bookings" || pathname.startsWith("/bookings/");
	}
	return pathname === href;
};

const Header = () => {
	const pathname = usePathname();

	return (
		<header className="border-b bg-white">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<span className="font-semibold text-gray-900">Booking App</span>

				<nav className="flex items-center gap-6">
					<Link
						href="/bookings"
						className={clsx(
							navLink,
							isActive(pathname, "/bookings") && navLinkActive,
						)}
					>
						Bookings
					</Link>

					<Link
						href="/create-booking"
						className={clsx(
							navLink,
							isActive(pathname, "/create-booking") &&
								navLinkActive,
						)}
					>
						New booking
					</Link>

					<Link
						href="/about"
						className={clsx(
							navLink,
							isActive(pathname, "/about") && navLinkActive,
						)}
					>
						About
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
