import React from "react";
import { Link } from "react-router-dom";

const HotelsList = (props) => {

    return (
        <li>
            <img src={props.imageUrl} alt={props.hotelName} style={{width:"200px", height:"150px", objectFit:"cover"}} />
            <h2>{props.hotelName}</h2>
            <p>Price: ${props.price}</p>
            <p>Pin Code: {props.pincode}</p>
            <p>City: {props.city}</p>
             <Link to={`/hotels/${props.id}`} style={{color:"blue", textDecoration:"underline"}}>
                Book Now
            </Link>
        </li>
    );
};

export default HotelsList;