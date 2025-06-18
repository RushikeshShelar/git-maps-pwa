'use client';

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { useTripData } from "@/hooks/useTripData";
import { useLiveLocation } from "@/hooks/useLiveLocation";
import { useMemberLocations } from "@/hooks/useMemberLocations";

import Map from "@/components/google-map";
import { Button } from "@/components/ui/button";
import { leaveTrip } from "@/lib/db/trips";

export default function TripPage() {
    const router = useRouter();

    const { user, loading: authLoading } = useAuth();
    const { tripId, tripData, loading: tripLoading } = useTripData(user?.uid);

    // Push live Location every 5s
    useLiveLocation(user?.uid ?? "", tripId ?? "");
    const { members: memberLocations, loading: memberLoading } = useMemberLocations(tripId);

    if (authLoading || tripLoading || memberLoading) {
        return <p className="text-center mt-10 p-4">Loading...</p>;
    }

    if (!user) {
        router.push("/login");
        return null;
    }

    if (!tripData || !tripId) {
        return (
            <div className="p-4">
                <p>No active trip found. Please join or create a trip.</p>
            </div>
        );
    }

    const creatorName = tripData.members?.[tripData.creator]?.name || "Unknown";

    const handleLeaveTrip = async () => {
        await leaveTrip(user.uid, tripId);
        router.push("/home");
    }

    return (
        <div className="p-4 space-y-4">
            <div>
                <h1 className="text-2xl font-bold">{tripData.routeName}</h1>
                <p className="text-gray-600">Created by: {creatorName}</p>
                <p className="text-2xl">Invide Code: {tripId}</p>
                <p className="mt-2 font-medium">Members:</p>
                <ul className="list-disc pl-6">
                    {Object.entries(tripData.members)
                        .filter(([uid]) => uid !== tripData.creator)
                        .map(([uid, member]: any) => (
                            <li key={uid}>{member.name}</li>
                        ))}
                </ul>
                <Button variant={"destructive"} onClick={handleLeaveTrip}>LEAVE TRIP </Button>
            </div>

            <Map
                markers={memberLocations
                    .filter((m) => m.location)
                    .map((m) => ({
                        lat: m.location!.lat,
                        lng: m.location!.lng,
                        label: m.name,
                    }))
                }
            />
        </div>
    );
}