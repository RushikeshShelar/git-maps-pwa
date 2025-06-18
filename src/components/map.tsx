"use client";

import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { RefObject, memo } from "react";

const containerStyle = {
    width: "100%",
    height: "100vh"
};

type LatLng = { lat: number; lng: number };

type MapProps = {
    center: LatLng;
    source?: LatLng;
    destination?: LatLng;
    mapRef: RefObject<google.maps.Map | null>;
    directionsResult?: google.maps.DirectionsResult | null;
    selectedRouteIndex: number
};

function MapComponent({ center, source, destination, mapRef, directionsResult, selectedRouteIndex }: MapProps) {
    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={(map) => {
                mapRef.current = map
            }}
        // options={{
        //     disableDefaultUI: false,
        //     clickableIcons: true,
        //     fullscreenControl: false,
        // }}
        >
            {source && <Marker position={source} label="S" />}
            {destination && <Marker position={destination} label="D" />}
            {directionsResult && (
                <DirectionsRenderer
                    directions={{
                        ...directionsResult,
                        routes: [directionsResult.routes[selectedRouteIndex]]
                    }}
                    options={{ suppressMarkers: false }}
                />
            )}

        </GoogleMap>
    )
}

export const Map = memo(MapComponent);