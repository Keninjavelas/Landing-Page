import { NextResponse } from 'next/server';

export async function GET() {
  const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  
  if (!web3formsAccessKey) {
    return NextResponse.json({
      error: 'WEB3FORMS_ACCESS_KEY not configured',
      env_vars: Object.keys(process.env).filter(k => k.includes('WEB3')),
    });
  }

  try {
    const testData = {
      access_key: web3formsAccessKey,
      name: 'Test User',
      email: 'aryankapoor0303@gmail.com',
      subject: 'Test Email from API',
      message: 'This is a test email to verify Web3Forms integration.',
      from_name: 'Test User',
      replyto: 'test@example.com',
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      result: result,
      accessKeyPrefix: web3formsAccessKey.substring(0, 8) + '...',
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
