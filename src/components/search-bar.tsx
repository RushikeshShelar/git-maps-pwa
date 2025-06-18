"use client";


import { usePlacesAutoComplete } from "@/hooks/maps/usePlacesAutoComplete";

type SearchBarProps = {
    onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
};

export function SearchBar({ onPlaceSelected }: SearchBarProps) {
    usePlacesAutoComplete("search-input", onPlaceSelected);

    return (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[60%] z-10">
            <input
                id="search-input"
                type="text"
                placeholder="Search destination..."
                className="w-full px-4 py-2 rounded-full shadow-md border border-gray-300 focus:outline-none"
            />
        </div>
    );

}
