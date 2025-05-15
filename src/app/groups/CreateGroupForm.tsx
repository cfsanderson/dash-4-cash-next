'use client';
import { useState } from 'react';

export default function CreateGroupForm({ onGroupCreated }: { onGroupCreated: () => void }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create group');
      }
      setName('');
      onGroupCreated();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2 items-end">
      <div>
        <label htmlFor="group-name" className="block text-sm font-medium">Group Name</label>
        <input
          id="group-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border rounded px-2 py-1"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50"
        disabled={loading || !name.trim()}
      >
        {loading ? 'Creating...' : 'Create Group'}
      </button>
      {error && <span className="text-red-600 ml-2">{error}</span>}
    </form>
  );
}
