"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/auth";
import { createTrip } from "@/lib/db/trips";

import { JoinTripModal } from "@/components/join-trip-modal";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useTripData } from "@/hooks/useTripData";

export default function HomePage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const { tripId, tripData, loading: tripLoading } = useTripData(user?.uid);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [creatingTrip, setCreatingTrip] = useState(false);
    const [tripName, setTripName] = useState("My Awesome Trip");


    if (authLoading || tripLoading) return <p className="text-center mt-10">Loading...</p>; // TODO: REPLACE with a Loader
    if (!user) return <p className="text-center mt-10">Please log in to access this page.</p>; // TODO: Redirect or provide a Link to Login

    const handleCreateTrip = async () => {
        if (!user?.uid || !user?.displayName) return;
        setCreatingTrip(true);
        try {
            const newTripId = await createTrip(user.uid, tripName, user.displayName);
            router.push(`/trip`);
        } catch (error) {
            alert("Failed to create trip. Try again.");
            console.error("[CREATE_TRIP_ERROR]", error);
        } finally {
            setCreatingTrip(false);
        }
    };

    const handleContinueTrip = () => {
        router.push("/trip");
    }

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    }

    return (
        <div className="flex h-screen justify-center items-center">
            <Card className="w-96 shadow-xl p-2" >
                <CardHeader>
                    <CardTitle>Welcome, {user.displayName}</CardTitle>
                    <CardDescription>
                        {tripId
                            ? `You are already in a Trip: ${tripData?.routeName ?? 'Unammed Trip'}`
                            : "Start or Join a Trip"}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                    {tripId ? (
                        <Button onClick={handleContinueTrip} className="bg-green-600 text-white">
                            Continue Your Trip
                        </Button>
                    ) : (
                        <>
                            <input
                                value={tripName}
                                onChange={(e) => setTripName(e.target.value)}
                                className="border px-3 py-2 rounded-md"
                                placeholder="Trip name (e.g., Mumbai to Goa)"
                            />
                            <Button onClick={handleCreateTrip} disabled={creatingTrip}>
                                {creatingTrip ? "Creating..." : "Start New Trip"}
                            </Button>
                            <Button
                                onClick={() => setShowJoinModal(true)}
                                className="bg-blue-500 text-white"
                            >
                                Join Existing Trip
                            </Button>
                        </>
                    )}
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button variant="destructive" onClick={handleLogout}>
                        Log Out
                    </Button>
                </CardFooter>
            </Card>

            {showJoinModal && <JoinTripModal onClose={() => setShowJoinModal(false)} />}
        </div>
    );
}