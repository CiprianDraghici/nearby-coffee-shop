import React, {useState} from 'react';
import './App.css';
import XYChart from "./components/XYChart";
import PinInfo from "./components/PinInfo";

function App() {
    const [selectedDataPoint, setSelectedDataPoint] = useState<{id: string, name: string, x: string | number, y: string | number} | null>( null);

    const onSelectedDataPoint = (dataPoint: {id: string, name: string, x: string | number, y: string | number} | null) => {
        setSelectedDataPoint(dataPoint);
    }

    return (
        <div className="App">
            <div className="row">
                <div className="col">
                    <XYChart selectedDataPointCallback={onSelectedDataPoint} />
                </div>
                <div className="col">
                    <PinInfo selectedDataPoint={selectedDataPoint} />
                </div>
            </div>
        </div>
    );
}

export default App;
