"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookings } from "@/store/slices/bookingsSlice";
import { useEffect } from "react";

export default function BookingsPage() {
	const dispatch = useAppDispatch();
	const { items, loading } = useAppSelector((s) => s.bookings);

	useEffect(() => {
		dispatch(fetchBookings());
	}, [dispatch]);

	if (loading) return <p>Loading...</p>;

	return (
		<ul>
			{items.map((b) => (
				<li key={b.id}>{b.title}</li>
			))}
		</ul>
	);
}
