"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "../lib/api";

export default function CreateBookingPage() {
	const router = useRouter();
	const [form, setForm] = useState({
		title: "",
		guestName: "",
		dateFrom: "",
		dateTo: "",
	});

	async function handleSubmit(e: React.FormEvent) {
		if (form.dateFrom > form.dateTo) {
			alert("End date must be after start date");
			return;
		}
		e.preventDefault();
		await createBooking(form);
		router.push("/bookings");
	}

	return (
		<form onSubmit={handleSubmit} className="max-w-md space-y-4">
			<h2 className="text-2xl font-semibold">Create booking</h2>

			<input
				className="border p-2 w-full"
				placeholder="Title"
				required
				onChange={(e) => setForm({ ...form, title: e.target.value })}
			/>

			<input
				className="border p-2 w-full"
				placeholder="Guest name"
				required
				onChange={(e) =>
					setForm({ ...form, guestName: e.target.value })
				}
			/>

			<input
				type="date"
				className="border p-2 w-full"
				required
				onChange={(e) => setForm({ ...form, dateFrom: e.target.value })}
			/>

			<input
				type="date"
				className="border p-2 w-full"
				required
				onChange={(e) => setForm({ ...form, dateTo: e.target.value })}
			/>

			<button className="bg-blue-600 text-white px-4 py-2 rounded">
				Save
			</button>
		</form>
	);
}
