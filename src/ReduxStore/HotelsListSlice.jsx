import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelsArray: [],
};

const HotelsListSlice = createSlice({
    name: "hotelsList",
    initialState,
    reducers: {
        setHotelsArray: (state, action) => {
            state.hotelsArray = action.payload;
        },
    }
});

export const fetchHotelsFromDatabase = () => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://hotel-bookings-b8f97-default-rtdb.firebaseio.com/hotels.json");
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error.message);
            }
           
            let hotelsArray = [];
            for (const key in data) {
                hotelsArray.push({
                    id: key,
                    ...data[key]
                });
            }
            
            dispatch(hotelsListActions.setHotelsArray(hotelsArray));
        } catch (error) {
            console.error("Error fetching hotels:", error.message);
        }
    };
};


export const hotelsListActions = HotelsListSlice.actions;
export default HotelsListSlice.reducer;