import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Booking } from "@/types/booking";
import { deleteBooking, getBookings } from "@/lib/api.client";

interface BookingsState {
	items: Booking[];
	loading: boolean;
	error: string | null;
}

const initialState: BookingsState = {
	items: [],
	loading: true,
	error: null,
};

export const fetchBookings = createAsyncThunk("bookings/fetch", async () => {
	return await getBookings();
});

export const removeBooking = createAsyncThunk(
	"bookings/delete",
	async (id: string) => {
		await deleteBooking(id);
		return id;
	},
);

const bookingsSlice = createSlice({
	name: "bookings",
	initialState,
	reducers: {
		removeOptimistic: (state, action) => {
			state.items = state.items.filter((b) => b.id !== action.payload);
		},
		restoreBooking: (state, action) => {
			state.items.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			// FETCH
			.addCase(fetchBookings.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchBookings.fulfilled, (state, action) => {
				state.items = action.payload;
				state.loading = false;
			})
			.addCase(fetchBookings.rejected, (state) => {
				state.loading = false;
				state.error = "Failed to load bookings";
			})

			// DELETE

			.addCase(removeBooking.fulfilled, (state) => {
				state.error = null;
			})

			.addCase(removeBooking.rejected, (state) => {
				state.error = "Delete failed";
			});
	},
});

export const { removeOptimistic, restoreBooking } = bookingsSlice.actions;

export default bookingsSlice.reducer;
