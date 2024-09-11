import React, { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

const SearchResult = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<CollectionEntry<"blog">[]>(
    [],
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("query");
    setQuery(queryParam);

    const fetchArticles = async () => {
      const allBlogArticles: CollectionEntry<"blog">[] =
        await getCollection("blog");

      if (queryParam) {
        const filteredArticles = allBlogArticles.filter((article) => {
          const titleMatch = article.data.title
            .toLowerCase()
            .includes(queryParam.toLowerCase());
          const bodyMatch = article.body
            .toLowerCase()
            .includes(queryParam.toLowerCase());
          return titleMatch || bodyMatch;
        });
        setSearchResults(filteredArticles);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1 className="text-2xl pb-3 mt-6">
        Results For <strong>{query}</strong>
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {searchResults.map((article) => (
          <ArticleCard key={article.url} article={article} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
