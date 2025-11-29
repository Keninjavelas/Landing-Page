import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('web3forms-domain-verification', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
