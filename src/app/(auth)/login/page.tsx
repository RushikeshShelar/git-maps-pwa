'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

import { signInWithGoogle } from "@/lib/auth";
import { saveUser } from '@/lib/db';


import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const user = await signInWithGoogle();
            await saveUser(user);
            router.push("/home")

        } catch (error: any) {
            setError(error.message);
            console.log("[LOGIN ERROR]", error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">ConvoyMate</h1>
            <Button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? 'Signing in...' : 'Sign in with Google'}
            </Button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    )
}