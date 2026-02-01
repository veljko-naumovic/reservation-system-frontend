"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookings } from "@/store/slices/bookingsSlice";
import BookingsSkeleton from "@/components/skeletons/BookingsSkeleton";
import BookingCard from "@/components/booking/BookingCard";

export default function BookingsPage() {
	const dispatch = useAppDispatch();
	const { items, loading, error } = useAppSelector((state) => state.bookings);

	useEffect(() => {
		dispatch(fetchBookings());
	}, [dispatch]);

	if (loading) {
		return <BookingsSkeleton />;
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
					<BookingCard key={b.id} booking={b} />
				))}
			</ul>
		</section>
	);
}
