import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import Providers from "./Providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "Booking App",
		template: "%s · Booking App",
	},
	description:
		"Simple booking and reservation app built with Next.js, TypeScript and Tailwind CSS.",
	applicationName: "Booking App",
	metadataBase: new URL("http://localhost:3000"), // ili tvoj domen
	openGraph: {
		type: "website",
		siteName: "Booking App",
	},
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
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
};

export default RootLayout;
