import React from 'react'
import { useSelector } from 'react-redux';

const BookingsPage = () => {

    const bookingsArray = useSelector((state) => state.bookings.bookingsArray);

  return (
    <div>
        <h1>Your Bookings</h1>
        <p>Here you can view and manage your hotel bookings.</p>
        {bookingsArray.length === 0 ? (
            <p>You have no bookings.</p>
        ) : (
            <ul>
                {bookingsArray.map((booking) => (
                    <li key={booking.id}>
                      <img src={booking.imageUrl} alt={booking.hotelName} style={{width:"200px", height:"150px", objectFit:"cover"}} />
                        <h2>{booking.hotelName}</h2>
                        <p>Price: ${booking.price}</p>
                        <p>Pin Code: {booking.pincode}</p>
                        <p>City: {booking.city}</p>
                        <p>Guests: {booking.guests}</p>
                        <p>Check-in: {booking.checkinDate}</p>
                        <p>Check-out: {booking.checkoutDate}</p>
                        <p>Status: {booking.status}</p>
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default BookingsPage