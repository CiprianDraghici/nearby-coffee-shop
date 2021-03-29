import React from 'react';
import './App.css';
import NearestCoffeeShops from "./components/NearestCoffeeShops";
import {useGeolocation} from "./hooks/useGeolocation";
import {ToastContainer} from "react-toastify";

function App() {
    const {userGeoLocation, errorGeoLocation} = useGeolocation();

    return (
        <div className="App">
            <div className="inline-code container">
                {
                    errorGeoLocation &&
                    <div className="alert alert-danger" role="alert">
                        {`Error: ${errorGeoLocation.message}. Check your browser location permissions to be able to access the application`}
                    </div>
                }
                {
                    !errorGeoLocation &&
                    <div style={{display: "flex", flexDirection: "column", height: "100%", width: "100%"}}>
                        <NearestCoffeeShops userGeoLocation={userGeoLocation}/>
                    </div>
                }
            </div>
            <ToastContainer pauseOnFocusLoss={false} />
        </div>
    );
}

export default App;
