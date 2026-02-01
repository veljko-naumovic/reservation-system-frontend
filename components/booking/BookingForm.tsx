"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export interface BookingFormData {
	title: string;
	guestName: string;
	dateFrom: string;
	dateTo: string;
}

interface Props {
	initialValues?: BookingFormData;
	onSubmit: (data: BookingFormData) => void;
}

export default function BookingForm({ initialValues, onSubmit }: Props) {
	const [title, setTitle] = useState(initialValues?.title ?? "");
	const [guestName, setGuestName] = useState(initialValues?.guestName ?? "");
	const [dateFrom, setDateFrom] = useState(initialValues?.dateFrom ?? "");
	const [dateTo, setDateTo] = useState(initialValues?.dateTo ?? "");

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		onSubmit({ title, guestName, dateFrom, dateTo });
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

			<Button type="submit">
				{initialValues ? "Save changes" : "Create booking"}
			</Button>
		</form>
	);
}
