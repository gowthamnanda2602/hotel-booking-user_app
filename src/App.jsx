import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch,Redirect } from 'react-router-dom';
import { authActions } from './ReduxStore/AuthSlice';
import WelcomePage from './Pages/WelcomePage';
import BookingsPage from './Pages/BookingsPage';
import HotelsListingPage from './Pages/HotelsListingPage';
import LoginSignUpPage from './Pages/LoginSignUpPage';
import Navbar from './Components/Navbar';
import { fetchHotelsFromDatabase } from './ReduxStore/HotelsListSlice';
import HotelBookingFormPage from './Pages/HotelBookingFormPage';  
import { fetchBookingsFromDatabase } from './ReduxStore/BookingsSlice'; 

function App() {
  
   const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const hotelsArray = useSelector((state) => state.hotelsList.hotelsArray);
  console.log("Hotels array in App component:",typeof hotelsArray);
  console.log("Auth state in App component:", auth.isUserLoggedIn);

  useEffect(() => {
        console.log("useEffect triggered in App component. Checking auth state...");
        if (auth.isUserLoggedIn) {
          console.log("User is logged in, fetching hotels data...");
          dispatch(fetchHotelsFromDatabase());
        }
      }, []);

  useEffect(() => {
    if(!auth.token){
      return;
    }
    const verifyToken = async () => {
      try {
        const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDWQrdbUSE0IIOy68rPcOXwN6jRbHCG9R0",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: auth.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
      );
          if (!response.ok) {
            dispatch(authActions.removeCredentials());
          }
        } catch (error) {
          dispatch(authActions.removeCredentials());
        }
      };

      verifyToken();
       },[auth]);

      useEffect(() => {
        if(auth.isUserLoggedIn) {
          dispatch(fetchBookingsFromDatabase());
        }
      }, [auth]);

  return (
    <div>
    {auth.isUserLoggedIn && <Navbar />}
      <main>
      <Switch>
        <Route path="/auth" exact>
          {!auth.isUserLoggedIn ? <LoginSignUpPage /> : <Redirect to="/welcome" />}
        </Route>
        <Route path="/welcome" exact>
          {auth.isUserLoggedIn ? <WelcomePage /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/bookings" exact>
          {auth.isUserLoggedIn ? <BookingsPage /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/hotels-listing" exact>
          {auth.isUserLoggedIn ? <HotelsListingPage /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/hotels/:id" exact>
          {auth.isUserLoggedIn ? <HotelBookingFormPage /> : <Redirect to="/auth" />}
        </Route>
          <Route path="*">
          {auth.isUserLoggedIn ? <Redirect to="/welcome" /> : <Redirect to="/auth" />}
        </Route>
      </Switch>
      </main>
    </div>
  )
}

export default App
