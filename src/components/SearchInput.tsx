import React, { useEffect, useState } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("query");
    if (queryParam) {
      setQuery(queryParam);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    window.location.href = `/articles/search?query=${encodeURIComponent(query)}`;
  };

  return (
    <form
      id="search-form"
      className="flex items-center"
      onSubmit={handleSubmit}
    >
      <label htmlFor="search-input" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={handleChange}
          className="bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-sm rounded-lg focus:outline-maple-600 w-full p-2.5"
          placeholder="Search articles..."
          required
        />
      </div>
      <button
        type="submit"
        className="p-2.5 ms-2 text-sm font-medium text-white bg-maple-500 rounded-lg border border-maple-500 hover:bg-maple-600 focus:ring-4 focus:outline-none focus:ring-maple-300"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          ></path>
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
};

export default SearchPage;
