import { NextResponse } from 'next/server';
import axios from 'axios';

const NEWS_API_KEY = process.env.NEWS_API_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'latest';
    const page = parseInt(searchParams.get('page') as string, 10) || 1;
    const pageSize = parseInt(searchParams.get('pageSize') as string, 9) || 9;
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const sources = searchParams.get('sources');

    const url = `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`
        + (from ? `&from=${from}` : '')
        + (to ? `&to=${to}` : '')
        + (sources ? `&sources=${sources}` : '');

    try {
        const response = await axios.get(url);
        return NextResponse.json(response.data?.articles);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching news' }, { status: 500 });
    }
}
