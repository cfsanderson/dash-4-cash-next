'use client';
import useSWR from 'swr';
import CreateGroupForm from './CreateGroupForm';
import { useUser } from '@/lib/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function GroupsPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(user ? '/api/groups' : null, fetcher);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [user, loading, router]);

  if (loading || isLoading) return <div>Loading...</div>;
  if (!user) return null;
  if (error) return <div>Error loading groups</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-700">Signed in as {user.email}</span>
        <button
          onClick={async () => { await supabase.auth.signOut(); router.replace('/auth'); }}
          className="text-red-600 border px-2 py-1 rounded hover:bg-red-50"
        >
          Sign Out
        </button>
      </div>
      <h1>Groups</h1>
      <CreateGroupForm onGroupCreated={() => mutate()} />
      <ul>
        {data?.map((group: any) => (
          <li key={group.id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
}
