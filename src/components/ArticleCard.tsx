import React from 'react'
import type { CollectionEntry } from 'astro:content'
import { formatDate } from '../utils'

interface Props {
  article: CollectionEntry<'blog'>
}

const ArticleCard: React.FC<Props> = ({ article }) => {
  return (
    <div className="mt-10">
      <div className="h-full overflow-hidden rounded-lg border border-gray-200 shadow-lg dark:border-gray-600">
        <a href={`/articles/${article.slug}`}>
          <img
            src={`/images/${article.data.image}`}
            alt="Article Image"
            className="h-48 w-full object-cover transition duration-300 ease-in-out hover:opacity-75"
          />
        </a>
        <div className="p-6">
          <h2 className="mb-2 text-2xl font-semibold">
            <a href={`/articles/${article.slug}`}>{article.data.title}</a>
          </h2>
          <p className="mb-2 text-sm">{formatDate(article.data.date)}</p>
          <p className="mb-4 hidden sm:line-clamp-3 xl:line-clamp-5">
            <a href={`/articles/${article.slug}`}>{article.data.excerpt}</a>
          </p>
          <div className="flex flex-wrap gap-2">
            {article.data.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className={
                  index % 2 === 0
                    ? 'rounded-full bg-green-500 px-2 py-1 text-xs text-white hover:opacity-90'
                    : 'rounded-full bg-maple-600 px-2 py-1 text-xs text-white hover:opacity-90'
                }
              >
                <a href={`/tags/${tag}`}>#{tag}</a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
