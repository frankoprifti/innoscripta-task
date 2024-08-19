import axiosInstance from '@/axiosInstance';

export type NewsArticle = {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    source: string;
    publishedAt: string;
};

export type NewsSources = {
    id: string;
    name: string;
};

export const fetchNewsFromNewsApi = async (
    query: string,
    page: number = 1,
    pageSize: number = 9,
    from?: string,
    to?: string,
    sources?: string
): Promise<NewsArticle[]> => {
    const response = await axiosInstance.get('/api/news/newsapi', {
        params: { q: query, page, pageSize, from, to, sources },
    });
    return response.data;
};

export const fetchNewsFromGuardian = async (
    query: string,
    page: number = 1,
    pageSize: number = 9,
    from?: string,
    to?: string,
    section?: string,
): Promise<NewsArticle[]> => {
    const response = await axiosInstance.get('/api/news/guardian', {
        params: { q: query, page, pageSize, from, to, section },
    });
    console.log(response.data)
    return response.data.map((doc: any) => ({
        title: doc.webTitle,
        description: '',
        url: doc.webUrl,
        urlToImage: undefined,
        source: 'The Guardian',
        publishedAt: doc.webPublicationDate,
    }));
};

export const fetchNewsFromNYTimes = async (
    query: string,
    page: number = 1,
    pageSize: number = 9,
    from?: string,
    to?: string,
    section?: string,
): Promise<NewsArticle[]> => {
    const response = await axiosInstance.get('/api/news/nyt', {
        params: { q: query, page, pageSize, from, to, section },
    });
    return response.data.map((doc: { headline: { main: any; }; lead_paragraph: any; web_url: any; multimedia: { url: any; }[]; source: any; pub_date: any; }) => ({
        title: doc.headline.main,
        description: doc.lead_paragraph,
        url: doc.web_url,
        urlToImage: doc.multimedia[0]?.url ? `https://www.nytimes.com/${doc.multimedia[0]?.url}` : undefined,
        source: doc.source,
        publishedAt: doc.pub_date,
    }));
};

export const fetchSourcesFromNewsApi = async (): Promise<NewsSources[]> => {
    const response = await axiosInstance.get('/api/news/sources', {
        params: {},
    });
    return response.data;
};
