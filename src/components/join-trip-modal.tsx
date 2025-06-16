"use client";
import { useState } from "react";

import { joinTrip } from "@/lib/db";
import { useAuth } from "@/hooks/useAuth";

export function JoinTripModal({ onClose }: { onClose: () => void }) {
    const [tripCode, setTripCode] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { user } = useAuth();

    const handleJoin = async () => {
        try {
            if (!user) return;
            console.log(user.uid, tripCode, user.displayName)
            await joinTrip(user.uid, tripCode, user.displayName || "RIDER");
            alert('Trip Joined');
            onClose();
        } catch (error: any) {
            setError('Trip not found or failed to join.');
            console.log('[ERROR]', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-lg font-semibold mb-2">Join a Trip</h2>
                <input
                    type="text"
                    placeholder="Enter Trip Code"
                    value={tripCode}
                    onChange={(e) => setTripCode(e.target.value)}
                    className="border p-2 w-full mb-2"
                />
                <button
                    onClick={handleJoin}
                    className="bg-green-600 text-white px-4 py-2 rounded w-full"
                >
                    Join Trip
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button onClick={onClose} className="text-sm text-gray-500 mt-2 w-full">
                    Cancel
                </button>
            </div>
        </div>
    );
}
