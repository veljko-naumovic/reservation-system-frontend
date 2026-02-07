"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDate, getDuration } from "@/lib/date";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookings } from "@/store/slices/bookingsSlice";

type StatusFilter = "all" | "pending" | "confirmed" | "cancelled";
type SortOrder = "newest" | "oldest";

const statusStyles = (status: string) => {
	switch (status) {
		case "confirmed":
			return "bg-green-100 text-green-700";
		case "cancelled":
			return "bg-red-100 text-red-700";
		default:
			return "bg-yellow-100 text-yellow-700";
	}
};

const BookingsPage = () => {
	const dispatch = useAppDispatch();
	const { items, loading, error } = useAppSelector((state) => state.bookings);

	const router = useRouter();
	const searchParams = useSearchParams();

	// UI state synced with URL
	const [statusFilter, setStatusFilter] = useState<StatusFilter>(
		(searchParams.get("status") as StatusFilter) ?? "all",
	);

	const [sortOrder, setSortOrder] = useState<SortOrder>(
		(searchParams.get("sort") as SortOrder) ?? "newest",
	);

	const isFiltered = statusFilter !== "all" || sortOrder !== "newest";

	useEffect(() => {
		dispatch(fetchBookings());
	}, [dispatch]);

	// Derived data (filter + sort)
	const visibleBookings = useMemo(() => {
		let result = [...items];

		if (statusFilter !== "all") {
			result = result.filter((b) => b.status === statusFilter);
		}

		result.sort((a, b) => {
			const aDate = new Date(a.createdAt).getTime();
			const bDate = new Date(b.createdAt).getTime();
			return sortOrder === "newest" ? bDate - aDate : aDate - bDate;
		});

		return result;
	}, [items, statusFilter, sortOrder]);

	const updateQuery = (nextStatus: StatusFilter, nextSort: SortOrder) => {
		const params = new URLSearchParams();

		if (nextStatus !== "all") {
			params.set("status", nextStatus);
		}

		if (nextSort !== "newest") {
			params.set("sort", nextSort);
		}

		router.replace(`/bookings?${params.toString()}`, {
			scroll: false,
		});
	};

	if (loading) {
		return (
			<div className="py-10 text-base text-gray-500">
				Loading bookings…
			</div>
		);
	}

	if (error) {
		return <div className="py-10 text-base text-red-600">{error}</div>;
	}

	if (items.length === 0) {
		return (
			<div className="text-center py-16 space-y-2">
				<p className="text-xl font-medium">No bookings yet</p>
				<p className="text-base text-gray-500">
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
				<span className="text-base text-gray-500">
					{visibleBookings.length} shown
				</span>
			</div>

			<div className="flex flex-wrap items-center gap-3">
				<div className="relative">
					<select
						value={statusFilter}
						onChange={(e) => {
							const next = e.target.value as StatusFilter;
							setStatusFilter(next);
							updateQuery(next, sortOrder);
						}}
						className="
							appearance-none
							border
							rounded
							px-3
							py-2
							pr-10
							text-base
							bg-white
							focus:outline-none
							focus:ring-2
							focus:ring-blue-500"
					>
						<option value="all">All statuses</option>
						<option value="pending">Pending</option>
						<option value="confirmed">Confirmed</option>
						<option value="cancelled">Cancelled</option>
					</select>

					<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</span>
				</div>

				<div className="relative">
					<select
						value={sortOrder}
						onChange={(e) => {
							const next = e.target.value as SortOrder;
							setSortOrder(next);
							updateQuery(statusFilter, next);
						}}
						className="
								appearance-none
								border
								rounded
								px-3
								py-2
								pr-10
								text-base
								bg-white
								focus:outline-none
								focus:ring-2
								focus:ring-blue-500"
					>
						<option value="newest">Newest first</option>
						<option value="oldest">Oldest first</option>
					</select>

					{/* Arrow */}
					<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</span>
				</div>
			</div>

			{/* List */}
			<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{visibleBookings.map((b) => (
					<li
						key={b.id}
						className="
							rounded-lg border bg-white p-4
							transition-all duration-150
							hover:shadow-md hover:-translate-y-0.5
						"
					>
						<div className="space-y-2">
							<Link
								href={`/bookings/${b.id}`}
								className="text-xl font-medium hover:underline"
							>
								{b.title}
							</Link>

							<div className="text-base text-gray-700">
								{b.guestName}
							</div>

							<div className="text-base text-gray-500">
								{formatDate(b.dateFrom)} →{" "}
								{formatDate(b.dateTo)}
								<span className="ml-1 text-gray-400">
									({getDuration(b.dateFrom, b.dateTo)} nights)
								</span>
							</div>
						</div>

						<div className="mt-4 flex items-center justify-between">
							<span
								className={`text-sm px-2 py-1 rounded-full ${statusStyles(
									b.status,
								)}`}
							>
								{b.status}
							</span>

							<span className="text-sm text-gray-400">
								Created {formatDate(b.createdAt)}
							</span>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
};

export default BookingsPage;
