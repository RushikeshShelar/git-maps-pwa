// hooks/useLiveLocation.ts
import { useEffect } from "react";
import { pushLocation } from "@/lib/db/location";

export function useLiveLocation(uid: string, tripId: string) {
  useEffect(() => {
    if (!uid || !tripId) return;

    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          pushLocation(uid, tripId, coords.latitude, coords.longitude);
        },
        (err) => console.error("[Location PUSH ERROR]:", err),
        { enableHighAccuracy: true }
      );
    };
    updateLocation(); // Push once immediately
    const interval = setInterval(updateLocation, 5000); // Push every 5s  

    return () => clearInterval(interval);
  }, [uid, tripId]);
}
