import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    User
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return user;
    } catch (error: any) {
        if (error.code === 'auth/popup-closed-by-user') {
            throw new Error('Popup closed. Please try again.');
        }
        throw error;
    }
}

export function logout() {
    return signOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}