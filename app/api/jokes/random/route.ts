import { NextResponse } from 'next/server';
import { randomJoke } from '@/lib/jokes';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(randomJoke());
}
