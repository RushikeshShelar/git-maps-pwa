// /hooks/useTripData
import { useState, useEffect } from "react";
import { getUserTrip } from "@/lib/db/users";
import { TripData } from "@/lib/schema";


export function useTripData(uid: string | undefined | null) {
    const [tripId, setTripId] = useState<string | null>(null);
    const [tripData, setTripData] = useState<TripData | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!uid) return;

        const fetchTrip = async () => {
            try {
                const result = await getUserTrip(uid);
                if (result) {
                    setTripId(result.tripId);
                    setTripData(result.data);
                } else {
                    setTripId(null);
                    setTripData(null);
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch trip data:", error);
                setTripData(null);
                setTripId(null);
            } finally {
                setLoading(false);
            }
        }
        fetchTrip();
    }, [uid]);

    return { tripId, tripData, loading };
}