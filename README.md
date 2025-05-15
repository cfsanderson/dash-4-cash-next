# Dash 4 Cash (Re-architected)

This is a reboot of https://github.com/cfsanderson/dash-4-cash

The goal is to build a modern, social running and charity app built with:
- **Next.js (React + TypeScript)**
- **Tailwind CSS**
- **Supabase (PostgreSQL, Auth, API)**
- **SWR/TanStack Query for data fetching**
- **Strava API integration**

## Getting Started

1. **Clone the repo and install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Configure environment variables:**
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Architecture Overview

- **Frontend:** Next.js (TypeScript), Tailwind CSS, SWR for data fetching
- **Backend/API:** Next.js API Routes for business logic, Strava OAuth, and secure Supabase access
- **Database/Auth:** Supabase (PostgreSQL, Auth, Strava tokens)

## Key Features
- User authentication (Supabase Auth)
- Strava OAuth integration
- Group and Dash management
- Activity syncing from Strava
- Donation tracking

## Supabase Schema (Recommended)
See `/supabase/schema.sql` (provided in this repo) or use the SQL below in the Supabase dashboard.

## Strava Integration
- Strava OAuth handled via Next.js API route `/api/strava/callback`
- Access/refresh tokens stored in Supabase
- Activities fetched from Strava API and saved to Supabase

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Strava API Docs](https://developers.strava.com/docs/)

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
