import { uploadFile } from '@/lib/ipfs';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const url = await uploadFile(data.url);
  return NextResponse.json({ url });
}
