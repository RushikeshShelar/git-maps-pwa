This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Roadmap

✅ Checkpoint 2: Route Planning & Selection
“User searches for a destination → selects a path → confirms vehicle type (bike/car/etc).”

Tasks:

🔍 Add a search bar using Google Maps Places API.

📍 Mark Source and Destination on the map.

🛣️ Fetch multiple routes using Google Maps Directions API.

🚗 Allow user to filter routes by vehicle type (bike, car, etc.).

✅ Let user select and confirm one route.

💾 Store selected route (polyline/steps) in Firebase under that trip.
---
✅ Checkpoint 3: Navigation Start + UI
“User starts trip → navigation UI begins (route shown, current location pinned, step-by-step instructions if feasible).”

Tasks:

🔄 Convert route into polyline and draw it on map.

📍 Continuously show user location along the route.

📌 Show navigation steps or direction indicator (basic text is okay for MVP).

🧭 Highlight progress on route (e.g., traveled path vs remaining).
---
✅ Checkpoint 4: Real-Time Collaboration & Tracking
“Track all members in the trip along the route, highlight if anyone strays.”

Tasks:

📡 Show location of all members live on the map with their names/icons.

🧭 Check if members are on route vs deviated (compare lat/lng to polyline).

🚨 Show warning/icon if someone deviates.

🗺️ Optionally let user center the map on a selected member.

✅ Checkpoint 5: Invite Flow + Trip Management
“Share trip via code or link, manage trip state.”
---
Tasks:

🔗 Generate joinable trip link (/join?tripId=xxx).

🔐 Share code via clipboard/share intent (web/mobile).

🧑‍🤝‍🧑 Allow removal of members (by creator).

🚦 End trip — set isActive: false, archive data.

🕓 Show start/end time, duration, and total distance after trip.
---
✅ Checkpoint 6: Polish MVP & UI
Clean up UX and functionality.

Tasks:

🧪 Edge cases: bad trip codes, mid-trip join, network failover, etc.

🧼 UI polish: avatars, trip status badge, current speed/time, etc.

⚙️ Toggle between "Only My View" vs "All Members View".

📱 Responsive design for mobile use.
---
Future (Post MVP Ideas)
Voice navigation instructions

Geo-fencing alerts

ETA prediction for each member

Offline support with localStorage fallback

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
