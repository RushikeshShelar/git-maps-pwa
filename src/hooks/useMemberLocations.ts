// hooks/useMemberLocations.ts
import { useEffect, useState } from "react";

import { MemberType, subscribeToTripMemberLocations } from "@/lib/db/location";

export function useMemberLocations(tripId: string | null) {
    const [members, setMembers] = useState<MemberType[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!tripId) {
            setMembers([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const unsubscribe = subscribeToTripMemberLocations(tripId, (members) => {
            setMembers(members);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup listener
    }, [tripId]);

    return { members, loading };
}
