'use client';
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth"; // assuming you have a custom hook
import { redirect } from "next/navigation"; // optional if user is not in trip

export default function TripPage() {
    const { user } = useAuth();
    const [tripData, setTripData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchTripData = async () => {
            try {
                const userTripRef = ref(database, `users/${user.uid}/currentTripId`);
                const tripIdSnap = await get(userTripRef);
                const tripId = tripIdSnap.val();

                if (!tripId) {
                    console.warn("User not in a trip");
                    return redirect("/home"); // or show fallback UI
                }

                const tripRef = ref(database, `trips/${tripId}`);
                const tripSnap = await get(tripRef);

                if (tripSnap.exists()) {
                    setTripData(tripSnap.val());
                } else {
                    console.warn("Trip not found");
                }
            } catch (err) {
                console.error("Failed to load trip:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTripData();
    }, [user]);

    if (loading) return <p>Loading trip...</p>;
    if (!tripData) return <p>No trip data found.</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-2">{tripData.routeName}</h1>
            <p>Created by: {tripData.creator}</p>
            <p>Members:</p>
            <ul className="list-disc pl-6">
                {tripData.members &&
                    Object.entries(tripData.members).map(([uid, member]: any) => (
                        <li key={uid}>{member.name}</li>
                    ))}
            </ul>
        </div>
    );
}
