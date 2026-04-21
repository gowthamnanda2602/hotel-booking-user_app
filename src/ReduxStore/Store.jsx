import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import hotelsListReducer from "./HotelsListSlice";
import bookingsReducer from "./BookingsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    hotelsList: hotelsListReducer,
    bookings: bookingsReducer,
  }
});

export default store;