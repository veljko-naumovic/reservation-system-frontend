import Providers from "@/components/Providers";
import "./globals.css";

export const metadata = {
	title: "Booking Reservation App",
	description: "Simple booking app built with Next.js",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-gray-50 text-gray-900">
				<Providers>
					<div className="min-h-screen flex flex-col">
						<header className="border-b bg-white">
							<div className="container mx-auto px-4 py-4 font-semibold">
								Booking App
							</div>
						</header>

						<main className="flex-1 container mx-auto px-4 py-6">
							{children}
						</main>

						<footer className="border-t bg-white text-sm text-center py-4">
							© {new Date().getFullYear()} Booking App
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
