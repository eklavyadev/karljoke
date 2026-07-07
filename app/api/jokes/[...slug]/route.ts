import { NextResponse } from 'next/server';
import { randomNum, jokeByType } from '@/lib/jokes';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const slug = params.slug;

  // Handle /api/jokes/{type}/random
  if (slug.length === 2 && slug[1] === 'random') {
    return NextResponse.json(jokeByType(slug[0], 1));
  }

  // Handle /api/jokes/{type}/ten
  if (slug.length === 2 && slug[1] === 'ten') {
    return NextResponse.json(jokeByType(slug[0], 10));
  }

  // Handle /api/jokes/{type}/{number}
  if (slug.length === 2) {
    const type = slug[0];
    const num = parseInt(slug[1]);
    if (!isNaN(num)) {
      return NextResponse.json(jokeByType(type, num));
    }
  }

  // Handle /api/jokes/{number}
  if (slug.length === 1) {
    const number = parseInt(slug[0]);
    if (!isNaN(number)) {
      return NextResponse.json(randomNum(number));
    }
  }

  return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
}
