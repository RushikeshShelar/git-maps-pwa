import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    User
} from "firebase/auth";
import { setCookie, deleteCookie } from 'cookies-next'; // on client

import { auth } from "@/lib/firebase";


/**
 * Sign in using Google Popup
 */
export async function signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Get ID token and set it as cookie
        const token = await user.getIdToken();
        setCookie('token', token, { maxAge: 60 * 60 * 24 }); // 1 day

        return user;

    } catch (error: any) {
        if (error.code === 'auth/popup-closed-by-user') {
            throw new Error('Popup closed. Please try again.');
        }
        throw new Error(error.message || 'Authentication failed');
    }
}

/**
 * Logs out the current user
 */
export function logout(): Promise<void> {
    // Firebase logout
    deleteCookie('token');
    return signOut(auth);
}

/**
 * Listen to user auth state changes
 */
export function onAuthChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}
