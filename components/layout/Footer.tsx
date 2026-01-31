export default function Footer() {
	return (
		<footer className="border-t bg-white">
			<div className="container mx-auto px-4 py-4 text-center text-sm text-gray-500">
				© {new Date().getFullYear()} Booking App · Built with Next.js
			</div>
		</footer>
	);
}
