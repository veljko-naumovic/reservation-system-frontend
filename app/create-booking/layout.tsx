import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "New booking",
	description: "Create new booking.",
};

const BookingsLayout = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

export default BookingsLayout;
