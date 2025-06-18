import { ref, set, get, update } from 'firebase/database';

import { database } from '@/lib/firebase';
import { TripData } from '@/lib/schema';

/**
 *  Create a New Trip
 * @param creatorId User ID of the Creator of Trip
 * @param routeName Name of the Route or Path //TODO: Update this to feature whole route details
 * @param creatorName Name of the Creator
 * @returns string | null
 */
export async function createTrip(creatorId: string, routeName: string, creatorName: string) {
    try {
        const tripId = `trip_${Date.now()}`;
        const tripRef = ref(database, `trips/${tripId}`);

        const tripData: TripData = {
            creator: creatorId,
            routeName,
            isActive: true,
            createdAt: new Date().toISOString(),
            members: {
                [creatorId]: {
                    name: creatorName,
                    joinedAt: new Date().toISOString(),
                    vehicleType: 'bike', // Optional now
                }
            },
        }
        await set(tripRef, tripData);
        await update(ref(database, `users/${creatorId}`), { currentTripId: tripId });

        return tripId;
    } catch (error) {
        console.error("[CREATE TRIP ERROR]", error);
        throw error; // Re-throw to handle in UI
    }
}

/**
 * Join a trip using code(tripId)
 * @param uid Firebase Auth UID
 * @param tripId Firebase Trip UID
 * @param name Name of the user 
 * @returns void
 */
export async function joinTrip(uid: string, tripId: string, name: string) {
    try {
        const tripRef = ref(database, `trips/${tripId}`);
        const tripSnap = await get(tripRef);
        if (!tripSnap.exists()) throw new Error('Trip not found');

        // Add user to the members List
        await update(ref(database), {
            [`trips/${tripId}/members/${uid}`]: {
                name,
                joinedAt: new Date().toISOString(),
            },
            [`users/${uid}/currentTripId`]: tripId,
        });
    } catch (error) {
        console.error("[JOIN TRIP ERROR]", error)
        throw error; // Re-throw to handle in UI
    }
}

/**
 * Fetches trip data by tripId
 * @param tripId ID of the trip
 * @returns trip data or null
 */
export async function getTripByID(tripId: string): Promise<any | null> {
    const tripRef = ref(database, `trips/${tripId}`);
    const snapshot = await get(tripRef);
    return snapshot.exists() ? snapshot.val() : null;
}

/**
 * Leave a Trip
 * @param uid Firebase Auth UID
 * @param tripId Firebase Trip UID
 * @returns void
 */
export async function leaveTrip(uid: string, tripId: string) {
    try {
        const updates: any = {
            [`trips/${tripId}/members/${uid}`]: null,
            [`users/${uid}/currentTripId`]: null,
        };

        await update(ref(database), updates);

        // Fetch trip data *after* removal
        const tripRef = ref(database, `trips/${tripId}`)
        const tripSnap = await get(tripRef);
        const tripData = tripSnap.val();

        // Optional: delete trip if last user
        if (tripData && Object.keys(tripData.members || {}).length === 0) {
            await set(tripRef, null);
        }

    } catch (error) {
        console.error("[LEAVE TRIP ERROR]", error);
        throw error; // Re-throw to handle in UI
    }
}

