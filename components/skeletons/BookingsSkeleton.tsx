export default function BookingsSkeleton() {
	return (
		<section className="space-y-6">
			{/* Header skeleton */}
			<div className="flex items-center justify-between">
				<div className="h-7 w-32 rounded bg-gray-200 animate-pulse" />
				<div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
			</div>

			{/* Cards skeleton */}
			<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 3 }).map((_, i) => (
					<li
						key={i}
						className="rounded-lg border bg-white p-4 space-y-3"
					>
						<div className="h-5 w-3/4 rounded bg-gray-200 animate-pulse" />
						<div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse" />
						<div className="h-4 w-full rounded bg-gray-100 animate-pulse" />

						<div className="mt-4 flex items-center justify-between">
							<div className="h-4 w-16 rounded-full bg-gray-200 animate-pulse" />
							<div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
