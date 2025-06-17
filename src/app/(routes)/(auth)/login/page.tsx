'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithGoogle } from "@/lib/auth";
import { saveUser } from '@/lib/db/users';

import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        try {
            const user = await signInWithGoogle();
            await saveUser(user); // This will only write if user is new
            router.push("/home");
        } catch (err: any) {
            setError(err.message || "Login failed.");
            console.error("[LOGIN ERROR]:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">GIT MAPS.com</h1>

            <Button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? 'Signing in...' : 'Sign in with Google'}
            </Button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}
