"use client";

import Filters from "@/components/Filters";
import { NewsCard } from "@/components/NewsCard";
import { useSearch } from "@/context/SearchContext";
import {
  NewsArticle,
  fetchNewsFromGuardian,
  fetchNewsFromNYTimes,
  fetchNewsFromNewsApi,
} from "@/services/newsService";
import { Button, Tabs, Tab } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { query, from, to, sources } = useSearch();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedProvider, setSelectedProvider] = useState<string>("newsapi");

  const fetchArticles = async (page: number) => {
    setLoading(true);
    try {
      let fetchedArticles: NewsArticle[] = [];

      switch (selectedProvider) {
        case "newsapi":
          fetchedArticles = await fetchNewsFromNewsApi(
            query,
            page,
            9,
            from,
            to,
            sources
          );
          break;
        case "guardian":
          fetchedArticles = await fetchNewsFromGuardian(
            query,
            page,
            9,
            from,
            to
          );
          break;
        case "nyt":
          fetchedArticles = await fetchNewsFromNYTimes(
            query,
            page,
            9,
            from,
            to
          );
          break;
        default:
          break;
      }

      if (page === 1) {
        setArticles(fetchedArticles);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...fetchedArticles]);
      }
      setHasMore(fetchedArticles.length > 0);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchArticles(1);
  }, [query, from, to, sources, selectedProvider]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (currentPage > 1) {
      fetchArticles(currentPage);
    }
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center w-full p-8">
      <div className="flex flex-col items-center">
        <Tabs
          selectedKey={selectedProvider}
          onSelectionChange={(key) => setSelectedProvider(key as string)}
          className="w-full mb-4"
        >
          <Tab title="NewsAPI" key={"newsapi"} />
          <Tab title="The Guardian" key={"guardian"} />
          <Tab title="NY Times" key={"nyt"} />
        </Tabs>
      </div>
      <Filters />
      <div className="flex row h-full gap-4 p-4 flex-wrap max-w-[1024px] justify-center">
        {articles.map((item, i) => (
          <NewsCard
            key={i}
            title={item.title}
            image={
              item.urlToImage ||
              "https://placehold.co/600x400/000000/FFFFFF.png?text=innoscripta"
            }
            description={item.description}
            url={item.url}
          />
        ))}
      </div>
      {hasMore && (
        <Button onClick={loadMore} isLoading={loading} className="mt-4">
          {loading ? "Loading" : "Load More"}
        </Button>
      )}
    </div>
  );
}
