import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  if (error) {
    return NextResponse.redirect(`/profile?error=${encodeURIComponent(error)}`);
  }
  if (!code) {
    return NextResponse.redirect('/profile?error=Missing+code');
  }

  // Exchange code for tokens
  const tokenRes = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    }),
  });
  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    return NextResponse.redirect(`/profile?error=${encodeURIComponent(tokenData.message || 'Strava token exchange failed')}`);
  }

  // Get user session from cookies
  const { data: { session } } = await supabase.auth.getUser(req.cookies.get('sb-access-token')?.value || '');
  if (!session?.user) {
    return NextResponse.redirect('/auth?error=Not+authenticated');
  }
  const userId = session.user.id;

  // Store tokens in Supabase
  await supabase.from('users').update({
    strava_access_token: tokenData.access_token,
    strava_refresh_token: tokenData.refresh_token,
    strava_token_expires_at: new Date(tokenData.expires_at * 1000).toISOString(),
    strava_user_id: tokenData.athlete?.id?.toString() || null,
  }).eq('id', userId);

  return NextResponse.redirect('/profile?strava=connected');
}
