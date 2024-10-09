import React from "react";
import type { CollectionEntry } from "astro:content";
import { formatDate } from "../utils";

interface Props {
  article: CollectionEntry<"blog">;
}

const ArticleCard: React.FC<Props> = ({ article }) => {
  return (
    <div className="mt-10 ">
      <div className="rounded-lg overflow-hidden shadow-lg h-full border border-gray-200 dark:border-gray-600">
        <a href={`/articles/${article.slug}`}>
          <img
            src={`/images/${article.data.image}`}
            alt="Article Image"
            className="w-full h-48 object-cover hover:opacity-75 transition duration-300 ease-in-out"
          />
        </a>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">
            <a href={`/articles/${article.slug}`}>{article.data.title}</a>
          </h2>
          <p className="text-sm mb-2">{formatDate(article.data.date)}</p>
          <p className="hidden mb-4 sm:line-clamp-3 xl:line-clamp-5">
            <a href={`/articles/${article.slug}`}>{article.data.excerpt}</a>
          </p>
          <div className="flex flex-wrap gap-2">
            {article.data.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className={
                  index % 2 === 0
                    ? "px-2 py-1 bg-green-500 text-white rounded-full text-xs hover:opacity-90"
                    : "px-2 py-1 bg-maple-600 text-white rounded-full text-xs hover:opacity-90"
                }
              >
                <a href={`/tags/${tag}`}>#{tag}</a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
