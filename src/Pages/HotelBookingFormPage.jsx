import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postBookingToDatabase } from "../ReduxStore/BookingsSlice";

const HotelBookingFormPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const hotelsArray = useSelector((state) => state.hotelsList.hotelsArray);
    console.log( hotelsArray);

    useEffect(() => {
                console.log("useEffect triggered in App component. Checking auth state...");
                if (!hotelsArray) {
                console.log("hotelsArray is fetching");
                dispatch(fetchHotelsFromDatabase());
                }
            }, [dispatch]);

    const hotelDetails = hotelsArray.find((hotel) => hotel.id === id);
    const [guests, setGuests] = useState(1);
    const [checkinDate, setCheckinDate] = useState("");
    const [checkoutDate, setCheckoutDate] = useState("");

    const bookingFormSubmitHandler = (e) => {
        e.preventDefault();
        if (!checkinDate || !checkoutDate  ) {
            alert("Please enter both check-in and check-out dates.");
            return;
        }
        if (new Date(checkinDate) >= new Date(checkoutDate)) {
            alert("Check-out date must be after check-in date.");
            return;
        }

       const bookingData = {
        hotelName: hotelDetails.hotelName,
        price: hotelDetails.price,
        pincode: hotelDetails.pincode,
        city: hotelDetails.city,
        imageUrl: hotelDetails.imageUrl,
        guests,
        checkinDate,
        checkoutDate,
        status: "pending"
         };
         dispatch(postBookingToDatabase(bookingData));
          setGuests(1);
          setCheckinDate("");
          setCheckoutDate("");
    };


    return (
        <div>
        <div>
            {/* <img src={hotelDetails.imageUrl} alt={hotelDetails.hotelName} /> */}
            <p>{hotelDetails.hotelName}</p>
            <p>Price: ${hotelDetails.price}</p>
            <p>Pin Code: {hotelDetails.pincode}</p>
            <p>City: {hotelDetails.city}</p>
        </div>
        <form onSubmit={bookingFormSubmitHandler}>
            <label htmlFor="guests">Number of Guests:</label>
            <input type="number" id="guests" value={guests} onChange={(e) => setGuests(e.target.value)} name="guests" min="1" max="4" />
            <label htmlFor="checkin">Check-in Date:</label>
            <input type="date" id="checkin" value={checkinDate} onChange={(e) => setCheckinDate(e.target.value)} name="checkin" />
            <label htmlFor="checkout">Check-out Date:</label>
            <input type="date" id="checkout" value={checkoutDate} onChange={(e) => setCheckoutDate(e.target.value)} name="checkout" />
            <button type="submit">Book Now</button>
        </form>
        </div>
    );
};

export default HotelBookingFormPage;
    