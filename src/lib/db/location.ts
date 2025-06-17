// lib/db/locations.ts
import { onValue, ref, update } from "firebase/database";
import { database } from "@/lib/firebase";

export type LocationType = {
    lat: number;
    lng: number;
    timestamp?: number;
};

export type MemberType = {
    uid: string;
    name: string;
    location?: LocationType;
};


export async function pushLocation(uid: string, tripId: string, lat: number, lng: number) {
    return update(ref(database), {
        [`trips/${tripId}/members/${uid}/location`]: {
            lat,
            lng,
            updatedAt: Date.now(),
        }
    });
}

export function subscribeToTripMemberLocations(
    tripId: string,
    callback: (members: MemberType[]) => void
): () => void {
    const tripRef = ref(database, `trips/${tripId}/members`);

    const unsubscribe = onValue(tripRef, (snapshot) => {
        const data = snapshot.val();

        if (!data) {
            callback([]);
            return;
        }

        const members: MemberType[] = Object.entries(data).map(
            ([uid, val]: [string, any]) => ({
                uid,
                name: val.name ?? "Rider",
                location: val.location
                    ? {
                        lat: val.location.lat,
                        lng: val.location.lng,
                        timestamp: val.location.timestamp,
                    }
                    : undefined
            })
        );
        callback(members);
    });
    return unsubscribe; // You return this to allow cleanup
}