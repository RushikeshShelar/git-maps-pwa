// types for Firebase data structure
export type UserData = {
    name: string;
    email: string;
    photoURL?: string;
    currentTripId: string | null;
    createdAt: string;
};

export type LocationData = {
    lat: number;
    lng: number;
    updatedAt: string; // ISO string for readability
};

export type MemberData = {
    name: string;
    joinedAt: string;
    vehicleType?: 'bike' | 'car';
    location?: LocationData;
};

export type TripData = {
    creator: string;
    routeName: string;
    createdAt: string;
    isActive: boolean;
    members: {
        [uid: string]: MemberData;
    };
};


// JSON Reference Schema (for understanding shape only)

//
// users: {
//   uid123: {
//     name: "Rushikesh",
//     email: "rushi@example.com",
//     currentTripId: "trip_1720000000000",
//     photoURL: "...",
//     createdAt: "2025-06-16T12:00:00Z"
//   }
// }
//
// trips: {
//   trip_1720000000000: {
//     creator: "uid123",
//     routeName: "Mumbai to Ladakh",
//     createdAt: "2025-06-16T12:00:00Z",
//     isActive: true,
//     members: {
//       uid123: {
//         name: "Rushikesh",
//         joinedAt: "2025-06-16T12:00:00Z",
//         vehicleType: "bike",
//         location: {
//           lat: 19.0760,
//           lng: 72.8777,
//           updatedAt: "2025-06-16T12:15:00Z"
//         }
//       }
//     }
//   }
// }
