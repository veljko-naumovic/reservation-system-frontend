import Providers from "@/components/Providers";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
						<Header />

						<main className="flex-1 container mx-auto px-4 py-6">
							{children}
						</main>

						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}
