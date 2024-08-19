import axios from "axios";
import { NextResponse } from "next/server";

const NEWS_API_KEY = process.env.NEWS_API_KEY;


export async function GET(request: Request) {
    const url = `https://newsapi.org/v2/top-headlines/sources?apiKey=${NEWS_API_KEY}`;

    try {
        const response = await axios.get(url);
        return NextResponse.json(response.data.sources);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error fetching sources' }, { status: 500 });
    }
}