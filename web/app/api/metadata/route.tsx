import { uploadMetadata } from '@/lib/ipfs';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const manifest = await uploadMetadata({
    name: data.name,
    description: data.description,
    attributes: [
      {
        trait_type: 'lat',
        value: data.lat,
      },
      {
        trait_type: 'long',
        value: data.long,
      },
      {
        trait_type: 'date',
        value: data.date,
      },
    ],
    image: data.image,
    image_url: data.image,
  });
  const metadata = `${manifest}/0`;
  return NextResponse.json({ metadata });
}
