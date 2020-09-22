import React, {useState} from 'react';
import './App.css';
import PinInfo from "./components/PinInfo";
import NearestCoffeeShops from './components/NearestCoffeeShops';
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
            <div className="row">
                <div className="col">
                    <NearestCoffeeShops selectedDataPointCallback={onSelectedDataPoint} userLocation={userGeoLocation} />
                </div>
                <div className="col">
                    <PinInfo selectedDataPoint={selectedDataPoint} userLocation={userGeoLocation} />
                </div>
            </div>
        </div>
    );
}

export default App;
