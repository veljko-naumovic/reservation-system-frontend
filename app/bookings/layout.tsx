import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "%s · Booking App",
		default: "Booking App",
	},
};

const Layout = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

export default Layout;
