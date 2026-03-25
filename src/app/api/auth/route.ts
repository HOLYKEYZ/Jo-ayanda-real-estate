import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    const adminEmail = process.env.ADMIN_EMAIL || 'nextphaserealestateltd@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (email === adminEmail && password === adminPassword) {
      // In a real app we'd set an HTTP-only cookie with a JWT here
      return NextResponse.json({ success: true, token: 'fake-jwt-token-for-demo' });
    }
    
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
