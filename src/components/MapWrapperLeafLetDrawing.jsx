import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function MapWrapperLeafLetDrawing(props) {
  const [selectedCoord, setSelectedCoord] = useState(null);
  const [drawnFeaturesLocal, setDrawnFeaturesLocal] = useState([]);
  const { userEmail } = useSelector((state) => state);
  const mapElement = useRef(null);

  useEffect(() => {
    const getGeoJSONArray = async (userEmail) => {
      try {
        const loadingToastId = toast.loading("Logging in...", {
          position: "bottom-left",
          className: "toast-message"
        });
        const response = await fetch(
          `https://gisprojectserver.onrender.com/drawings?userEmail=${encodeURIComponent(
            userEmail
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        const data = await response.json();
        console.log(data);
        if (data && data.data.length > 0) setDrawnFeaturesLocal(data.data);
        toast.dismiss(loadingToastId);
        toast.success("Data loaded successfully!", {
          autoClose: 1000
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.dismiss(loadingToastId);
        toast.error("An error occurred while saving data.", {
          autoClose: 3000
        });
      }
    };

    if (userEmail) {
      getGeoJSONArray(userEmail);
    } else {
      setDrawnFeaturesLocal([]);
    }
  }, [userEmail]);

  useEffect(() => {
    const map = L.map(mapElement.current).setView([0, 0], 2);
    L.tileLayer(
      "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles courtesy of the U.S. Geological Survey"
      }
    ).addTo(map);

    const featuresLayer = L.geoJSON(null).addTo(map);

    if (props.features.length) {
      featuresLayer.clearLayers();
      featuresLayer.addData(props.features);
      if (drawnFeaturesLocal.length !== 0) {
        console.log("drawnFeaturesLocal", drawnFeaturesLocal);
        const initialGeoJsonData = drawnFeaturesLocal;
        featuresLayer.addData(initialGeoJsonData);
      }

      const bounds = featuresLayer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [100, 100] });
      }
    }

    map.on("click", (event) => {
      const { lat, lng } = event.latlng;
      setSelectedCoord([lat, lng]);
    });

    const drawnItems = new L.FeatureGroup().addTo(map);

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems
      },
      draw: {
        polyline: true,
        polygon: true,
        rectangle: true,
        circle: true,
        marker: true
      }
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (event) => {
      const { layer } = event;
      drawnItems.addLayer(layer);

      const geoJson = layer.toGeoJSON();
      setDrawnFeaturesLocal((prevFeatures) => [...prevFeatures, geoJson]);
    });

    return () => {
      map.remove();
    };
  }, [props.features, drawnFeaturesLocal?.length]);

  const saveGeoJSON = async (geoJsonArray) => {
    console.log("geoJsonArray", geoJsonArray);
    const loadingToastId = toast.loading("Saving GeoJSON data ...", {
      position: "bottom-left",
      className: "toast-message"
    });
    try {
      const response = await fetch(
        "https://gisprojectserver.onrender.com/drawings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ data: geoJsonArray, userEmail })
        }
      );

      const result = await response.json();
      toast.dismiss(loadingToastId);
      if (result.status) {
        toast.success("GeoJSON Saved successfully!", {
          autoClose: 1000
        });
        console.log("GeoJSON saved successfully:", result.data);
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error("An error occurred while saving data.", {
        autoClose: 3000
      });
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div
        ref={mapElement}
        style={{ height: "400px", width: "100%", zIndex: 10 }}
        className="map-container"
      ></div>

      <div className="clicked-coord-label">
        <p>
          {selectedCoord
            ? `Latitude: ${selectedCoord[0].toFixed(
                5
              )}, Longitude: ${selectedCoord[1].toFixed(5)}`
            : "Click on the map to see coordinates."}
        </p>
      </div>

      <div
        onClick={() => {
          saveGeoJSON(drawnFeaturesLocal);
        }}
        style={{
          display: "block",
          borderRadius: "10px",
          position: "absolute",
          margin: "10px",
          padding: "10px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
          zIndex: "20"
        }}
      >
        Save
      </div>

      {/* Display Drawn Features */}
      {/* <div className="drawn-features">
        <h3>Drawn Features (GeoJSON):</h3>
        <pre>{JSON.stringify(drawnFeatures, null, 2)}</pre>
      </div> */}
    </div>
  );
}

export default MapWrapperLeafLetDrawing;

var vuawdv = [
  {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: [-12.304688, -16.299051]
    }
  },
  {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-107.578125, -7.710992],
          [-107.578125, -7.362467],
          [-107.578125, -7.362467],
          [-107.578125, -7.710992]
        ]
      ]
    }
  },
  {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-102.65625, -10.833306],
          [-110.742188, -22.593726],
          [-75.234375, -25.482951],
          [-102.65625, -10.833306]
        ]
      ]
    }
  },
  {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-47.8125, -4.214943],
          [-36.035156, -14.43468],
          [-54.316406, -21.616579],
          [-47.8125, -4.214943]
        ]
      ]
    }
  }
];
