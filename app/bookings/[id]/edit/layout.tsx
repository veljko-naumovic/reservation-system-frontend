import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Edit booking",
	description: "Edit booking.",
};

const BookingsLayout = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

export default BookingsLayout;
