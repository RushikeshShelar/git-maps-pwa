export type UserData = {
    name: string,
    email: string,
    photoURL?: string,
    currentTripId: string | null,
    createdAt: string
}

export type MemberData = {
    name: string;
    joinedAt: string;
    vehicleType?: 'bike' | 'car';
};

export type TripData = {
    creator: string,
    routeName: string,
    createdAt: string,
    isActive: boolean,
    members: {
        [uid: string]: MemberData
    }
}