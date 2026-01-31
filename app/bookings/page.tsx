"use client";

import { useEffect } from "react";
import Link from "next/link";

import { formatDate, getDuration } from "@/lib/date";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookings } from "@/store/slices/bookingsSlice";

function statusStyles(status: string) {
	switch (status) {
		case "confirmed":
			return "bg-green-100 text-green-700";
		case "cancelled":
			return "bg-red-100 text-red-700";
		default:
			return "bg-yellow-100 text-yellow-700";
	}
}

export default function BookingsPage() {
	const dispatch = useAppDispatch();
	const { items, loading, error } = useAppSelector((state) => state.bookings);

	useEffect(() => {
		dispatch(fetchBookings());
	}, [dispatch]);

	if (loading) {
		return <div className="text-gray-500 py-10">Loading bookings...</div>;
	}

	if (error) {
		return <div className="text-red-600 py-10">{error}</div>;
	}

	if (items.length === 0) {
		return (
			<div className="text-center py-16 space-y-2">
				<p className="text-lg font-medium">No bookings yet</p>
				<p className="text-sm text-gray-500">
					Create your first booking to get started.
				</p>
			</div>
		);
	}

	return (
		<section className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-semibold tracking-tight">
					Bookings
				</h2>
				<span className="text-sm text-gray-500">
					{items.length} total
				</span>
			</div>

			{/* List */}
			<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{items.map((b) => (
					<li
						key={b.id}
						className="
							rounded-lg border bg-white p-4
							transition-all duration-150 ease-out
							hover:shadow-md hover:-translate-y-0.5"
					>
						<div className="space-y-2">
							<Link
								href={`/bookings/${b.id}`}
								className="text-lg font-medium transition-colors duration-150 hover:underline"
							>
								{b.title}
							</Link>

							<div className="text-sm text-gray-600">
								{b.guestName}
							</div>

							<div className="text-sm text-gray-500">
								{formatDate(b.dateFrom)} →{" "}
								{formatDate(b.dateTo)}
								<span className="ml-1 text-gray-400">
									({getDuration(b.dateFrom, b.dateTo)} nights)
								</span>
							</div>
						</div>

						<div className="mt-4 flex items-center justify-between">
							<span
								className={`text-xs px-2 py-1 rounded-full transition-colors duration-150 ${statusStyles(
									b.status,
								)}`}
							>
								{b.status}
							</span>

							<span className="text-xs text-gray-400">
								Created {formatDate(b.createdAt)}
							</span>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
