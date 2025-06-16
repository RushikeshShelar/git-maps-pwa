"use client";
import { useState } from "react";

import Map from "@/components/google-map";

import { createTrip } from "@/lib/db";
import { logout } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";

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

export default function HomePage() {
    const [showModal, setShowModal] = useState(false);

    const { user, loading } = useAuth();


    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Please login to access this page</p>;


    const handleStartTrip = async () => {
        const uid = user?.uid;
        const name = user?.displayName;

        if (!uid || !name) return;
        const tripId = await createTrip(uid, 'Mumbai to Goa', name);
        alert('Trip started: ' + tripId);
    }

    return (
        <div className="flex h-screen justify-center items-center">
            <Card className="w-92">
                <CardHeader>
                    <CardTitle>Welcome, {user.displayName}</CardTitle>
                    <CardDescription>Start a Trip or Join and Existing One</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-6">
                    <Button onClick={handleStartTrip}>
                        Start a new Trip
                    </Button>
                    <Button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Join an existing trip
                    </Button>
                </CardContent>
                <CardFooter>
                    <Button variant={"destructive"} onClick={logout}> Log Out</Button>
                </CardFooter>
            </Card>

            {showModal && <JoinTripModal onClose={() => setShowModal(false)} />}
        </div>
    )
}