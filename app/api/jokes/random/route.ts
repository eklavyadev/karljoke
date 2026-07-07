import { NextResponse } from 'next/server';
import { randomJoke } from '@/lib/jokes';

export async function GET() {
  return NextResponse.json(randomJoke());
}
