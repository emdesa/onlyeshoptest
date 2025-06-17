"use client";

import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";

type latlng = [number, number];
type locationMarkerProps = {
  position: latlng | null;
  setPosition: (position: latlng) => void;
  markerIcon: L.Icon;
};

function LocationMarker({ position, setPosition, markerIcon }: locationMarkerProps) {
  const map = useMapEvents({
    click(e) {
      const newLocation: latlng = [e.latlng.lat, e.latlng.lng];
      setPosition(newLocation);

      map.flyTo(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={markerIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const Maplandmark = ({ location }: { location?: { lat: number; lng: number } }) => {
  const defaultLocation: latlng = [7.8804, 98.3923];

  const [position, setPosition] = useState<latlng | null>(
    location ? [location.lat, location.lng] : null
  );

  useEffect(() => {
    if (location) {
      setPosition([location.lat, location.lng]);
    }
  }, [location]);

  const markerIcon = useMemo(() => {
    return L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
      iconSize: [20, 30],
    });
  }, []);

  return (
    <div className="mb-2">
      <h1 className="mb-2 mt-4 font-semibold">Where is your Landmark?</h1>
      <input type="hidden" name="lat" value={position ? position[0] : ""} />
      <input type="hidden" name="lng" value={position ? position[1] : ""} />

      <MapContainer
        className=" h-[50vh] rounded-lg z-0 relative"
        center={
          location?.lat !== undefined && location?.lng !== undefined
            ? [location.lat, location.lng]
            : defaultLocation
        }
        zoom={12}
        scrollWheelZoom={false}
      >
        {position && (
          <Marker position={position} icon={markerIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        <LocationMarker
          position={position}
          setPosition={setPosition}
          markerIcon={markerIcon}
        />

        <LayersControl>
          <LayersControl.BaseLayer name="Openstreetmap" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Esri_WorldImagery">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default Maplandmark;
