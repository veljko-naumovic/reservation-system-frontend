import Link from "next/link";

const NotFoundPage = () => {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center text-center space-y-4">
			<h1 className="text-2xl font-semibold">Page not found</h1>

			<p className="text-gray-600 max-w-md">
				The page you are looking for doesn’t exist or has been moved.
			</p>

			<Link
				href="/bookings"
				className="
                        rounded px-4 py-2 text-sm
                      bg-gray-900 text-white
                      hover:bg-gray-800
                        transition"
			>
				Go to bookings
			</Link>
		</div>
	);
};

export default NotFoundPage;
