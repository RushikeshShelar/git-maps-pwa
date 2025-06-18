"use client";

import dynamic from "next/dynamic";

const MapWithSearch = dynamic(() => import(`@/components/map-with-search`), { ssr: false });

export default function StartPage() {
    return (
        <main className="h-screen w-full">
            <MapWithSearch />
        </main>
    );
}