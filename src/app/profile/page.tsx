'use client';
import { useUser } from '@/lib/UserContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ProfilePage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [stravaStatus, setStravaStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
    if (searchParams.has('strava')) {
      setStravaStatus('connected');
    } else if (searchParams.has('error')) {
      setStravaStatus('error');
    }
  }, [user, loading, router, searchParams]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="mb-4">
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>User ID:</strong> {user.id}</div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Strava Account</h2>
        {stravaStatus === 'connected' ? (
          <span className="text-green-700">Strava connected!</span>
        ) : (
          <a
            href="/api/strava/authorize"
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            Connect Strava
          </a>
        )}
        {stravaStatus === 'error' && (
          <div className="text-red-600 mt-2">Error connecting Strava. Try again.</div>
        )}
      </div>
      <button
        className="mt-4 text-red-600 border px-2 py-1 rounded hover:bg-red-50"
        onClick={async () => { await supabase.auth.signOut(); router.replace('/auth'); }}
      >
        Sign Out
      </button>
    </div>
  );
}
