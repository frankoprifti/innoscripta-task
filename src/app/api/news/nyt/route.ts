import { NextResponse } from 'next/server';
import axios from 'axios';

const NYT_API_KEY = process.env.NYT_API_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'latest';
    const section = searchParams.get('section');
    const fromDate = searchParams.get('from');
    const toDate = searchParams.get('to');

    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${NYT_API_KEY}`
        + `&q=${query}`
        + (section ? `&fq=section_name:("${section}")` : '')
        + (fromDate ? `&begin_date=${fromDate.replace(/-/g, '')}` : '')
        + (toDate ? `&end_date=${toDate.replace(/-/g, '')}` : '');

    try {
        const response = await axios.get(url);
        return NextResponse.json(response.data.response?.docs);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error fetching news from The New York Times' }, { status: 500 });
    }
}
