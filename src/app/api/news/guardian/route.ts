import { NextResponse } from 'next/server';
import axios from 'axios';

const GUARDIAN_API_KEY = process.env.GUARDIAN_API_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'latest';
    const section = searchParams.get('section');
    const fromDate = searchParams.get('from-date');
    const toDate = searchParams.get('to-date');

    const url = `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}`
        + `&q=${query}`
        + (section ? `&section=${section}` : '')
        + (fromDate ? `&from-date=${fromDate}` : '')
        + (toDate ? `&to-date=${toDate}` : '');

    try {
        const response = await axios.get(url);
        console.log(response.data.response.results, "HEHHEHEHEH")
        return NextResponse.json(response.data.response.results);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error fetching news from The Guardian' }, { status: 500 });
    }
}
