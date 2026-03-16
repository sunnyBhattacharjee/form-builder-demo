import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Extract the JSON payload sent by the React frontend
    const formSchema = await request.json();

    // 2. Perform Node-level validation here (optional but recommended)
    if (!formSchema.fields || !Array.isArray(formSchema.fields)) {
      return NextResponse.json({ error: 'Invalid form schema' }, { status: 400 });
    }

    // 3. Forward the request to your Java backend
    // The browser never sees this URL or the authorization headers
    const javaBackendUrl = process.env.JAVA_BACKEND_URL || 'http://localhost:8080';
    const javaSecretToken = process.env.JAVA_SERVICE_SECRET; 

    const response = await fetch(`${javaBackendUrl}/api/forms/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Inject a server-to-server secret so Java knows it came from your Node layer
        'Authorization': `Bearer ${javaSecretToken}`, 
      },
      body: JSON.stringify(formSchema),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to publish to Java backend');
    }

    // 4. Return the successful response back to the React client
    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error('Node Layer Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}