import { useEffect, useState } from "react";


type LatLng = { lat: number; lng: number };

export function useDirections(source: LatLng | null, destination: LatLng | null) {
    const [directionsResult, setDirectionsResult] = useState<google.maps.DirectionsResult | null>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (!source || !destination) return;

        setLoading(true);

        const directionService = new google.maps.DirectionsService();

        directionService.route({
            origin: source,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true
        },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && result) {
                    setDirectionsResult(result);
                } else {
                    console.error("Directions request failed:", status);
                }

                setLoading(false);
            }
        );
    }, [source, destination]);

    return { directionsResult, loading };
}