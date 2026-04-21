import React from "react";
import { useSelector } from "react-redux";
import HotelsList from "../Components/HotelsList";

const HotelsListingPage = () => {

    const hotelsArray = useSelector((state) => state.hotelsList.hotelsArray);
    console.log("Hotels array from Redux store:", hotelsArray);

    return (
        <div>
            <h1>Hotels List</h1>
            <ul>
                {hotelsArray.map((hotel) => (
                    <HotelsList key={hotel.id}
                        id={hotel.id}
                        hotelName={hotel.hotelName}
                        price={hotel.price}
                        pincode={hotel.pincode}
                        city={hotel.city}
                        imageUrl={hotel.imageUrl}
                    />
                ))}
            </ul>
        </div>
    );
};

export default HotelsListingPage;