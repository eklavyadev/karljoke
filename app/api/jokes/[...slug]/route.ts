import { NextResponse } from 'next/server';
import { randomNum, jokeByType } from '@/lib/jokes';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
	const { slug } = await params;

	if (slug.length === 2 && slug[1].toLowerCase() === 'random') {
		return NextResponse.json(jokeByType(slug[0], 1));
	}

	if (slug.length === 2 && slug[1].toLowerCase() === 'ten') {
		return NextResponse.json(jokeByType(slug[0], 10));
	}

	if (slug.length === 2) {
		const type = slug[0];
		const num = Number.parseInt(slug[1], 10);
		if (!Number.isNaN(num) && num > 0) {
			return NextResponse.json(jokeByType(type, num));
		}
	}

	if (slug.length === 1) {
		const number = Number.parseInt(slug[0], 10);
		if (!Number.isNaN(number) && number > 0) {
			return NextResponse.json(randomNum(number));
		}
	}

	return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
}
