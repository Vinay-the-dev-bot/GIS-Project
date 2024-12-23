import "./App.css";
import React, { useState, useEffect } from "react";
import GeoJSON from "ol/format/GeoJSON";
import MapWrapperLeafLetDrawing from "./components/MapWrapperLeafLetDrawing";
import Login from "./Pages/LoginPage/Login";
import { Provider } from "react-redux";
import store from "./Store/Store";

function App() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("/mock-geojson-api.json")
      .then((response) => response.json())
      .then((fetchedFeatures) => {
        const wktOptions = {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857"
        };
        const parsedFeatures = new GeoJSON().readFeatures(
          fetchedFeatures,
          wktOptions
        );
        setFeatures(parsedFeatures);
      });
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        {/* <MapWrapper features={features} /> */}
        {/* <MapWrapperLeafLet features={features} /> */}
        <Login />
        <MapWrapperLeafLetDrawing features={features} />
      </div>
    </Provider>
  );
}

export default App;
