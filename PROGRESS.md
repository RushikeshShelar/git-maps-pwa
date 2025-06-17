# 🌍 GIT MAPS

A real-time group navigation app for road trips, built with Firebase and Google Maps. This is the prototype or MVP verison of the Enitre Project.

---

## 🚩 Problem Statement

When multiple people are on a road trip with different vehicles, coordinating their location and progress becomes difficult. Git Maps solves this by allowing users to create or join trips and share live locations with each other in real time.

---

## 🚧 Project Progress

### 🔧 Setup
- ✅ Firebase Authentication (Google Sign-In)
- ✅ Firebase Realtime Database integration

---

## ⚙️ Core Functionalities Implemented

### 🔐 1. Login Page
- Google Sign-in via Firebase Auth
- Stores new user details on first login

---

### 🏠 2. Home Page
- ✅ Create Trip (generates a unique trip ID)
- ✅ Join Trip (using trip code via Modal)
- ✅ If user is already in a trip (continue Button)
- ✅ Logout button

---

### 🗺️ 3. Trip Page
- ✅ Trip Info:
  - Route Name
  - Creator Name
  - Invite Code
  - Member List (names)
- ✅ Google Map Integration
  - Displays location pin for each member
- ✅ Live Location:
  - Pushes user location every 5 seconds
  - Pins update live when location data changes in Firebase

---

## 🐞 Issues & Bugs

- ❌ **Middleware Not Working**  
  Currently, any user can access protected routes without authentication.  
  → Fix: Implement working `middleware.ts` to protect routes.

- ⚠️ **Joining a Non-Existent Trip**  
  If a user enters an invalid trip code, console shows error but user is still redirected to `/trip`.  
  → Fix: Validate trip existence **before** joining and redirecting.

---

## 📌 To Do (Next Steps)

- [ ] Fix Middleware for route protection
- [ ] Fix Trip validation before joining
- [ ] Add loading/error states for better UX
- [ ] Role-based UI (e.g. only creator can end/delete trip)

---

## 📁 Project Structure (WIP)

```
src/
├── app/
│   ├── (auth)/login.tsx
│   ├── (main)/home.tsx
│   └── (main)/trip.tsx
├── components/
│   └── google-map.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useTripData.ts
│   ├── useLiveLocation.ts
│   └── useMemberLocations.ts
├── lib/
│   ├── firebase.ts
│   └── db/
│       ├── user.ts
│       ├── trip.ts
│       └── location.ts
```

---

## 🛠 Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Firebase Auth, Firebase Realtime DB
- **Maps**: Google Maps API

---

## 🙌 Made with ❤️ by Rushikesh Shelar
