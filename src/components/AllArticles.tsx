import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { ARTICLES_PER_PAGE } from "../constants";
import ArticleCard from "./ArticleCard";
import LoadingGIF from "../images/loading.gif";

const AllArticles = () => {
  const [currentPage, setCurrentPage] = useState<number>(999);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [articlesForPage, setArticlesForPage] = useState<
    CollectionEntry<"blog">[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("page");

    if (queryParam === null) {
      setCurrentPage(1);
    } else {
      setCurrentPage(+queryParam);
    }
  }, []);

  useEffect(() => {
    if (currentPage === 999) return;

    const fetchArticles = async () => {
      setIsLoading(true);

      const allBlogArticles: CollectionEntry<"blog">[] = (
        await getCollection("blog")
      ).sort(
        (a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) =>
          b.data.date.valueOf() - a.data.date.valueOf(),
      );

      const totalPages: number = Math.ceil(
        allBlogArticles.length / ARTICLES_PER_PAGE,
      );

      const articlesForPage: CollectionEntry<"blog">[] = allBlogArticles.slice(
        (currentPage - 1) * ARTICLES_PER_PAGE,
        currentPage * ARTICLES_PER_PAGE,
      );

      setTotalPages(totalPages);
      setArticlesForPage(articlesForPage);
      setIsLoading(false);
    };

    fetchArticles();
  }, [currentPage]);

  return (
    <div>
      {isLoading ? (
        <img src={LoadingGIF.src} alt="Loading Image" />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articlesForPage.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            disablePrevious={currentPage === 1}
            disableNext={currentPage === totalPages}
          />
        </>
      )}
    </div>
  );
};

export default AllArticles;
