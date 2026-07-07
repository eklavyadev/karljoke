import { NextResponse } from 'next/server';
import { randomTen } from '@/lib/jokes';

export async function GET() {
  return NextResponse.json(randomTen());
}
