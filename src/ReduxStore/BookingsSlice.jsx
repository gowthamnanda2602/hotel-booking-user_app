import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingsArray: [],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
    reducers: {
        setBookingsArray(state, action) {
            state.bookingsArray = action.payload;
        }
    }
});

export const fetchBookingsFromDatabase = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(
                "https://hotel-bookings-b8f97-default-rtdb.firebaseio.com/bookings.json"
            );
             const data = await response.json();
            if (!response.ok) {
                throw new Error("Failed to fetch bookings data: "+ data.error.message);
            }
            const bookingsArray = [];
            for (const key in data) {
                bookingsArray.push({
                    id: key,
                    ...data[key],
                });
            }
            dispatch(bookingsActions.setBookingsArray(bookingsArray));
        } catch (error) {
            console.error("Error fetching bookings data:", error);
        }
    };
}

export const postBookingToDatabase = (bookingData) => {
    return async (dispatch) => {
        try {
            const response = await fetch(
                "https://hotel-bookings-b8f97-default-rtdb.firebaseio.com/bookings.json",
                {
                    method: "POST",
                    body: JSON.stringify(bookingData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error("Failed to post booking data: "+ data.error.message);
            }
            dispatch(fetchBookingsFromDatabase());
        } catch (error) {
            console.error("Error posting booking data:", error);
        }
    };
}

export const bookingsActions = bookingsSlice.actions;

export default bookingsSlice.reducer;