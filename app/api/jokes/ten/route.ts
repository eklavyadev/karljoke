import { NextResponse } from 'next/server';
import { randomTen } from '@/lib/jokes';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(randomTen());
}
