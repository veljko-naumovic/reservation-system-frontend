"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface Props {
	onSubmit: (data: {
		title: string;
		guestName: string;
		dateFrom: string;
		dateTo: string;
	}) => void;
}

export default function BookingForm({ onSubmit }: Props) {
	const [title, setTitle] = useState("");
	const [guestName, setGuestName] = useState("");
	const [dateFrom, setDateFrom] = useState("");
	const [dateTo, setDateTo] = useState("");

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		onSubmit({
			title,
			guestName,
			dateFrom,
			dateTo,
		});
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4 max-w-md">
			<Input
				placeholder="Booking title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>

			<Input
				placeholder="Guest name"
				value={guestName}
				onChange={(e) => setGuestName(e.target.value)}
				required
			/>

			<div className="grid grid-cols-2 gap-4">
				<Input
					type="date"
					value={dateFrom}
					onChange={(e) => setDateFrom(e.target.value)}
					required
				/>

				<Input
					type="date"
					value={dateTo}
					onChange={(e) => setDateTo(e.target.value)}
					required
				/>
			</div>

			<Button type="submit">Create booking</Button>
		</form>
	);
}
