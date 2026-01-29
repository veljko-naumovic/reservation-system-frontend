import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBookings, deleteBooking } from "@/lib/api";
import { Booking } from "@/app/types/booking";

interface BookingsState {
	items: Booking[];
	loading: boolean;
	error: string | null;
}

const initialState: BookingsState = {
	items: [],
	loading: false,
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
			console.log("OPTIMISTIC REMOVE", action.payload);
			state.items = state.items.filter((b) => b.id !== action.payload);
		},
		restoreBooking: (state, action) => {
			state.items.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBookings.fulfilled, (state, action) => {
				state.items = action.payload;
				state.loading = false;
			})
			.addCase(removeBooking.rejected, (state) => {
				state.error = "Delete failed";
			});
	},
});

export const { removeOptimistic, restoreBooking } = bookingsSlice.actions;

export default bookingsSlice.reducer;
