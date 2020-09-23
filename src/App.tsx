import React, {useState} from 'react';
import './App.css';
import PinInfo from "./components/PinInfo";
import NearestCoffeeShops from "./components/NearestCoffeeShops";
import {MarkSeriesPoint} from "react-vis";
import {useGeolocation} from "./hooks/useGeolocation";

function App() {
    const {userGeoLocation} = useGeolocation();
    const [selectedDataPoint, setSelectedDataPoint] = useState< MarkSeriesPoint | null>( null);

    const onSelectedDataPoint = (dataPoint: MarkSeriesPoint | null) => {
        setSelectedDataPoint(dataPoint);
    }

    return (
        <div className="App">
            <div className="inline-code container">
                <div style={{display: "flex", flexDirection: "column", height: "100%", width: "100%"}}>
                    <NearestCoffeeShops selectedDataPointCallback={onSelectedDataPoint} userLocation={userGeoLocation} />
                </div>
            </div>
        </div>
    );
}

export default App;
