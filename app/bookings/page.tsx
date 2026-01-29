"use client";

import { useEffect } from "react";
import Link from "next/link";

import { formatDate, getDuration } from "@/lib/date";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchBookings } from "../store/slices/bookingsSlice";

export default function BookingsPage() {
	const dispatch = useAppDispatch();
	const { items, loading, error } = useAppSelector((state) => state.bookings);

	useEffect(() => {
		dispatch(fetchBookings());
	}, [dispatch]);

	if (loading) {
		return <p className="text-gray-500">Loading bookings...</p>;
	}

	if (error) {
		return <p className="text-red-600">{error}</p>;
	}

	if (items.length === 0) {
		return <p className="text-gray-500">No bookings yet.</p>;
	}

	return (
		<section>
			<h2 className="text-2xl font-semibold mb-4">Bookings</h2>

			<ul className="space-y-3">
				{items.map((b) => (
					<li
						key={b.id}
						className="border rounded p-4 bg-white flex justify-between items-center hover:shadow-sm transition"
					>
						<div>
							<Link
								href={`/bookings/${b.id}`}
								className="font-medium hover:underline"
							>
								{b.title}
							</Link>

							<div className="text-sm text-gray-500">
								{b.guestName} • {formatDate(b.dateFrom)} →{" "}
								{formatDate(b.dateTo)}
							</div>

							<span className="text-xs text-gray-400">
								{getDuration(b.dateFrom, b.dateTo)} nights
							</span>
						</div>

						<span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">
							{b.status}
						</span>
					</li>
				))}
			</ul>
		</section>
	);
}
