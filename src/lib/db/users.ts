import { ref, set, get } from 'firebase/database';

import { database } from '@/lib/firebase';
import { UserData } from '@/lib/schema';

// Save a new user if not exist
export async function saveUser(user: any) {
    try {
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
    } catch (error) {
        console.error("[SAVE USER FAIL]", error);
    }
}

//Get Enitre User By ID
export async function getUserById(uid: string) {
    try {
        const userSnap = await get(ref(database, `users/${uid}`));
        if (!userSnap.exists()) {
            throw new Error("User not found");
        }
        return { user: userSnap.val() }
    } catch (error) {
        console.error("[USER ID NOT FOUND]", error);
        throw error;   // Re-throw to handle in UI
    }
}

//Get User Name by UserId
export async function getUserNameById(uid: string) {
    try {
        const result = await getUserById(uid);
        if (!result || !result.user) return null;

        const { name } = result.user;
        return { userName: name };
    } catch (error) {
        console.error("[USERNAME FETCH ERROR]", error);
        throw error;    // Re-throw to handle in UI 
    }
}


// Get Current trip for a user
export async function getUserTrip(uid: string) {
    try {
        const userSnap = await get(ref(database, `users/${uid}`));
        const user = userSnap.val();
        if (!user?.currentTripId) return null;

        const tripId = user.currentTripId;
        const tripSnap = await get(ref(database, `trips/${tripId}`));
        return tripSnap.exists() ? { tripId, data: tripSnap.val() } : null;
    } catch (error) {
        console.error("[USER TRIP NOT FOUND]", error);
        throw error; // Re-throw to handle in UI
    }
}

/**
 * Fetches the current trip ID of a user.
 * @param uid Firebase Auth UID
 * @returns string | null
 */
export async function getCurrentTripid(uid: string): Promise<String | null | undefined> {
    try {
        const userRef = ref(database, `users/${uid}/currentTripId`)
        const snapshot = await get(userRef);
        return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
        console.error("[GET CURRENT TRIP ERROR]", error);
        throw error; // Re-throw to handle in UI
    }
}

/**
 * Clears the current tripId of a user
 * @param uid Firebase UID
 */
export async function clearUserTrip(uid: string) {
    // Clear the current trip ID for the user
    try {
        await set(ref(database, `users/${uid}/currentTripId`), null);
    } catch (error) {
        console.error("[CLEAR USER TRIP ERROR]", error);
        throw error; // Re-throw to handle in UI
    }

}

