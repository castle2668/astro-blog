import React, { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import LoadingGIF from "../images/loading.gif";

const SearchResult: React.FC = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<CollectionEntry<"blog">[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("query");
    setQuery(queryParam);

    const fetchArticles = async () => {
      setIsLoading(true);

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
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1 className="text-2xl pb-3 mt-6">
        Results For <strong>{query}</strong>
      </h1>
      {isLoading ? (
        <img src={LoadingGIF.src} alt="Loading Image" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
      {searchResults.length === 0 && (
        <p className="text-xl mt-6">No results found for "{query}"</p>
      )}
    </div>
  );
};

export default SearchResult;
