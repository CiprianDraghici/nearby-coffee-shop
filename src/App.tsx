import React from 'react';
import './App.css';
import NearestCoffeeShops from "./components/NearestCoffeeShops";
import {useGeolocation} from "./hooks/useGeolocation";

function App() {
    const {userGeoLocation} = useGeolocation();

    return (
        <div className="App">
            <div className="inline-code container">
                <div style={{display: "flex", flexDirection: "column", height: "100%", width: "100%"}}>
                    <NearestCoffeeShops userLocation={userGeoLocation} />
                </div>
            </div>
        </div>
    );
}

export default App;
