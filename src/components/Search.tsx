import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { getCollection } from "astro:content";

interface SearchResult {
  title: string;
  description: string;
  url: string;
  category: string;
}

export const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    const posts = await getCollection("blog");
    const searchResults = posts
      .filter((post) => {
        const searchContent =
          `${post.data.title} ${post.data.description}`.toLowerCase();
        return searchContent.includes(searchQuery.toLowerCase());
      })
      .map((post: any) => ({
        title: post.data.title,
        description: post.data.description,
        url: `/${post.data.category}/${post.slug.split("/")[1]}`,
        category: post.data.category,
      }));

    setResults(searchResults);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 
                  dark:hover:text-blue-400 transition-colors"
        aria-label="Search"
      >
        <SearchIcon className="w-5 h-5" />
      </button>
      <div className="relative top-3" ref={searchRef}>
        {isOpen && (
          <div
            className="absolute right-[-5.7rem] sm:right-0 mt-2 w-screen max-w-md 
               bg-white dark:bg-gray-800 rounded-lg shadow-xl 
               border dark:border-gray-700"
          >
            <div className="p-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full p-2 border dark:border-gray-700 rounded-lg
                         bg-gray-50 dark:bg-gray-900 
                         text-gray-900 dark:text-gray-100"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 
                         dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {results.length > 0 && (
                <div className="mt-4 space-y-2 max-h-60 sm:max-h-96 overflow-y-auto">
                  {results.map((result) => (
                    <a
                      key={result.url}
                      href={result.url}
                      className="block p-3 hover:bg-gray-100 dark:hover:bg-gray-700 
                             rounded-lg transition-colors"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {result.description}
                      </p>
                      <span className="text-xs text-blue-600 dark:text-blue-400">
                        {result.category}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
