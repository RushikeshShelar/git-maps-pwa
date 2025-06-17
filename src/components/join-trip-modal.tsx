"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { joinTrip } from "@/lib/db/trips";
import { useAuth } from "@/hooks/useAuth";

export function JoinTripModal({ onClose }: { onClose: () => void }) {
    const [tripCode, setTripCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const handleJoin = async () => {
        if (!user || !tripCode.trim()) {
            setError("Please enter a valid Trip Code.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await joinTrip(user.uid, tripCode.trim(), user.displayName ?? "RIDER");
            router.push("/trip"); // Redirect after successful join
            onClose();
        } catch (err: any) {
            console.error("[JOIN TRIP ERROR]", err);
            setError("Trip not found or failed to join.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4">
                <h2 className="text-xl font-semibold text-center">Join a Trip</h2>
                <input
                    type="text"
                    placeholder="Enter Trip Code"
                    value={tripCode}
                    onChange={(e) => setTripCode(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleJoin}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full"
                    disabled={loading}
                >
                    {loading ? "Joining..." : "Join Trip"}
                </button>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                    onClick={onClose}
                    className="text-sm text-gray-500 hover:underline w-full"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}