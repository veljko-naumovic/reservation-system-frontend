"use client";

import { useEffect } from "react";
import { fetchBookings } from "@/app/store/slices/bookingsSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

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
