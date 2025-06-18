"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

import { Map } from "./map";
import { SearchBar } from "./search-bar";
import { BottomPanel } from "./bottom-trip-panel";
import { useDirections } from "@/hooks/maps/useDirections";

type LatLng = { lat: number; lng: number };

const libraries: (
    "places" | "drawing" | "geometry" | "visualization"
)[] = ["places"];


export default function MapWithSearch() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries
    });

    const mapRef = useRef<google.maps.Map | null>(null);

    const [center, setCenter] = useState<LatLng>({ lat: 19.0760, lng: 72.8777 }); // default Mumbai
    const [source, setSource] = useState<LatLng | null>(null);
    const [destination, setDestination] = useState<LatLng | null>(null);
    const [destinationName, setDestinationName] = useState<string | undefined>("");
    const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
    const [showRoute, setShowRoute] = useState(false);


    const { directionsResult, loading: loadingDirections } = useDirections(
        showRoute ? source : null,
        showRoute ? destination : null
    );

    const routes = directionsResult?.routes || [];


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Location coords
                const loc = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setCenter(loc);
                setSource(loc);
            },
            () => console.warn("Geolocation blocked. Using default center.")
        );
    }, []);

    //Pan to the Destination 
    useEffect(() => {
        if (destination && mapRef.current) {
            mapRef.current.panTo(destination);
            mapRef.current.setZoom(14);
        }
    }, [destination]);

    const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
        if (place.geometry && place.geometry.location) {
            const loc = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            setDestination(loc);
            setDestinationName(place?.name)
        }

    };

    const handleDirections = () => {
        setShowRoute(true);
    };

    if (!isLoaded) return <p className="text-center p-4">Loading Map...</p> //TODO: REPLACE WITH LOADER

    return (
        <div className="relative w-full h-screen">
            <Map center={center} source={source!} destination={destination!} mapRef={mapRef} directionsResult={directionsResult} selectedRouteIndex={selectedRouteIndex} />
            <SearchBar onPlaceSelected={handlePlaceSelected} />
            {destination && (
                <BottomPanel
                    placeName={destinationName ?? "Selected Destination"}
                    onDirections={handleDirections}
                    onStart={() => { }}
                />
            )}
            {routes.length > 1 && (
                <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto bg-white shadow-md px-4 py-2 rounded-lg">
                    {routes.map((route, i) => {
                        const leg = route.legs[0];
                        return (
                            <button
                                key={i}
                                className={`px-3 py-1 rounded border text-sm ${selectedRouteIndex === i ? "bg-blue-500 text-white" : "bg-white text-gray-800"
                                    }`}
                                onClick={() => setSelectedRouteIndex(i)}
                            >
                                {leg.distance?.text} • {leg.duration?.text}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    )
}
