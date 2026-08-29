/** @file Live user search input with debounced dropdown results. */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AppImage } from "@/components/AppImage";
import AppSpinner from "@/components/AppSpinner/AppSpinner";
import { useUserSearch } from "@/hooks";

const DEBOUNCE_MS = 400;
const MIN_QUERY_LENGTH = 2;

/**
 * @component AppSearch
 * @description Live-search input for users with a dropdown of matching results.
 * @prop {string} [className] - Additional wrapper classes
 * @prop {string} [placeholder] - Input placeholder text
 * @prop {() => void} [onNavigate] - Called after a result is selected (e.g. to close a drawer)
 */
interface AppSearchProps {
  className?: string;
  placeholder?: string;
  onNavigate?: () => void;
}

export function AppSearch({
  className = "",
  placeholder = "Search users...",
  onNavigate,
}: AppSearchProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Debounce: only fire the request after the user stops typing.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const shouldSearch = debouncedQuery.length >= MIN_QUERY_LENGTH;

  const {
    data: results = [],
    isLoading,
    isFetching,
    isError,
  } = useUserSearch(shouldSearch ? debouncedQuery : "");

  // Close dropdown on outside click.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape.
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleSelectUser = (user: {
    id: string;
    username?: string;
    name: string;
  }) => {
    const handle = user.username || user.name.toLowerCase().replace(/\s+/g, "");

    navigate(`/profile/${handle}`);

    setQuery("");
    setDebouncedQuery("");
    setIsOpen(false);
    onNavigate?.();
  };

  const showDropdown = isOpen && query.trim().length > 0;
  const isSearching = isLoading || isFetching;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-card/70 py-2 pl-9 pr-3 text-sm text-text placeholder:text-text-tertiary backdrop-blur-sm transition-colors focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-border bg-card shadow-2xl">
          {!shouldSearch ? (
            <div className="px-4 py-4 text-center text-sm text-text-secondary">
              حداقل ۲ حرف وارد کنید
            </div>
          ) : isSearching ? (
            <div className="flex items-center justify-center py-6">
              <AppSpinner size={22} />
            </div>
          ) : isError ? (
            <div className="px-4 py-4 text-center text-sm text-danger">
              خطا در جستجوی کاربران
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-4 text-center text-sm text-text-secondary">
              کاربری یافت نشد
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {results.map((user) => {
                const handle =
                  user.username || user.name.toLowerCase().replace(/\s+/g, "");

                return (
                  <li key={user.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectUser(user)}
                      className="flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-border/30"
                    >
                      <AppImage
                        src={user.image || ""}
                        alt={user.name}
                        variant="circle"
                        size="sm"
                      />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-text">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-text-secondary">
                          @{handle}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default AppSearch;
