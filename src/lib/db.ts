import { ref, set, get, update } from 'firebase/database';

import { database } from './firebase';
import { UserData, TripData } from './schema';

// Save a new user if not exist
export async function saveUser(user: any) {
    const userRef = ref(database, `users/${user.uid}`)
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
        const userData: UserData = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            currentTripId: null,
            createdAt: new Date().toISOString()
        }

        await set(userRef, userData);
    }
}

// Create a New Trip
export async function createTrip(creatorId: string, routeName: string, creatorName: string) {
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
}

// Get Current trip for a user
export async function getUserTrip(uid: string) {
    const userSnap = await get(ref(database, `users/${uid}`));
    const user = userSnap.val();
    if (!user.currentTripId) return null;

    const tripSnap = await get(ref(database, `trips/${user.currentTripId}}`));
    return tripSnap.exists() ? tripSnap.val() : null;
}

// Join a trip using code(tripId)
export async function joinTrip(uid: string, tripId: string, name: string) {
    const tripRef = ref(database, `trips/${tripId}`);
    const tripSnap = await get(tripRef);
    if (!tripSnap.exists()) throw new Error('Trip not found');

    // Add user to the members List
    await update(ref(database), {
        [`trips/${tripId}/members/${uid}`]: {
            name,
            joinedAt: Date.now(),
        },
        [`users/${uid}/currentTripId`]: tripId,
    });
}