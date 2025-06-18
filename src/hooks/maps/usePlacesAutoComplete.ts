import { useEffect, useRef } from "react";

type Callback = (places: google.maps.places.PlaceResult) => void;

export function usePlacesAutoComplete(inputId: string, onPlaceSelected: Callback) {
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    useEffect(() => {
        if (!window.google || !document.getElementById(inputId)) return;

        const input = document.getElementById(inputId) as HTMLInputElement;

        autocompleteRef.current = new window.google.maps.places.Autocomplete(input, {
            fields: ["geometry", "formatted_address", "name"],
        });

        autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current?.getPlace();
            if (place && place.geometry) {
                onPlaceSelected(place);
            }
        });
    }, [inputId, onPlaceSelected]);
};