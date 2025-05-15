import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  const { data, error } = await supabase.from('groups').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid group name' }, { status: 400 });
  }
  const { data, error } = await supabase.from('groups').insert([{ name }]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
