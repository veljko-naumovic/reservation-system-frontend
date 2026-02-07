export const metadata = {
	title: "About | Booking App",
};

const AboutPage = () => {
	return (
		<section className="max-w-2xl space-y-4">
			<h1 className="text-2xl font-semibold">About this app</h1>

			<p className="text-gray-600">
				This booking application is built with Next.js App Router,
				TypeScript and Tailwind CSS.
			</p>

			<p className="text-gray-600">
				It demonstrates server-side rendering, client-side state
				management with Redux Toolkit, and optimistic UI updates.
			</p>
		</section>
	);
};

export default AboutPage;
