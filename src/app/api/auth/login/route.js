import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; 

export async function POST(request) {
  try {
    const { username, password } =  await request.json();
    
    const dbResult = await query(
      'SELECT id, username, password, role FROM users WHERE username = $1',
      [username]
    );

    const user = dbResult.rows[0];

   
    if (user && user.password === password) {
      
      const response = NextResponse.json({ success: true, role: user.role });

      response.cookies.set('userRole', user.role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    }

    
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });

  } catch (error) {
    console.error('Database Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}