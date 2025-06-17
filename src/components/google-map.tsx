'use client';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 19.0760, // Default to Mumbai
    lng: 72.8777,
};

type MapProps = {
    markers: { lat: number; lng: number; label?: string }[];
};

export default function Map({ markers }: MapProps) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    if (!isLoaded) return <p>Loading Map...</p>;

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
            {markers.map((marker, i) => (
                <Marker key={i} position={{ lat: marker.lat, lng: marker.lng }} label={marker.label} />
            ))}
        </GoogleMap>
    );
}
