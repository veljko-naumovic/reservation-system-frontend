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
	onSubmit: (data: BookingFormData) => void;
	initialData?: Partial<BookingFormData>; // za edit
}

type Errors = Partial<Record<keyof BookingFormData, string>>;

const BookingForm = ({ onSubmit, initialData }: Props) => {
	const [title, setTitle] = useState(initialData?.title ?? "");
	const [guestName, setGuestName] = useState(initialData?.guestName ?? "");
	const [dateFrom, setDateFrom] = useState(initialData?.dateFrom ?? "");
	const [dateTo, setDateTo] = useState(initialData?.dateTo ?? "");

	const [errors, setErrors] = useState<Errors>({});

	const validate = (): boolean => {
		const nextErrors: Errors = {};

		if (!title.trim()) {
			nextErrors.title = "Title is required";
		}

		if (!guestName.trim()) {
			nextErrors.guestName = "Guest name is required";
		}

		if (!dateFrom) {
			nextErrors.dateFrom = "Start date is required";
		}

		if (!dateTo) {
			nextErrors.dateTo = "End date is required";
		}

		if (dateFrom && dateTo && dateFrom > dateTo) {
			nextErrors.dateTo = "End date must be after start date";
		}

		setErrors(nextErrors);
		return Object.keys(nextErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validate()) return;

		onSubmit({
			title,
			guestName,
			dateFrom,
			dateTo,
		});
	};

	const isValid =
		title && guestName && dateFrom && dateTo && dateFrom <= dateTo;

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<Input
				label="Booking title"
				value={title}
				onChange={(e) => {
					setTitle(e.target.value);
					setErrors((e) => ({ ...e, title: undefined }));
				}}
				error={errors.title}
				required
			/>

			<Input
				label="Guest name"
				value={guestName}
				onChange={(e) => {
					setGuestName(e.target.value);
					setErrors((e) => ({
						...e,
						guestName: undefined,
					}));
				}}
				error={errors.guestName}
				required
			/>

			<div className="grid grid-cols-2 gap-4">
				<Input
					label="From"
					type="date"
					value={dateFrom}
					onChange={(e) => {
						setDateFrom(e.target.value);
						setErrors((e) => ({
							...e,
							dateFrom: undefined,
						}));
					}}
					error={errors.dateFrom}
					required
				/>

				<Input
					label="To"
					type="date"
					value={dateTo}
					onChange={(e) => {
						setDateTo(e.target.value);
						setErrors((e) => ({
							...e,
							dateTo: undefined,
						}));
					}}
					error={errors.dateTo}
					required
				/>
			</div>

			<Button type="submit" disabled={!isValid}>
				Save booking
			</Button>
		</form>
	);
};

export default BookingForm;
