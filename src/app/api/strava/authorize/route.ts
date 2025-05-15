import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const params = new URLSearchParams({
    client_id: process.env.STRAVA_CLIENT_ID!,
    response_type: 'code',
    redirect_uri: process.env.STRAVA_REDIRECT_URI!,
    approval_prompt: 'auto',
    scope: 'read,activity:read',
  });
  const stravaAuthUrl = `https://www.strava.com/oauth/authorize?${params.toString()}`;
  return NextResponse.redirect(stravaAuthUrl);
}
