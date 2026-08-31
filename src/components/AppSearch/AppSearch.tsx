import type { AppSearchProps } from "@/types";
/** @file Responsive live user search with debounced results. */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AppImage } from "@/components/AppImage";
import AppIcon from "@/components/AppIcon/AppIcon";
import AppSpinner from "@/components/AppSpinner/AppSpinner";
import { useUserSearch } from "@/hooks";
import { DIC } from "@/constants";

const DEBOUNCE_MS = 400;
const MIN_QUERY_LENGTH = 2;
const DESKTOP_SEARCH_WIDTH = 260;



export function AppSearch({
  className = "",
  placeholder = DIC.search.placeholder,
  onNavigate,
}: AppSearchProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  /*
   * Debounce search requests so we don't request on every keystroke.
   */
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

  /*
   * Close search when clicking outside.
   */
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*
   * Close search with Escape.
   */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setIsOpen(false);
      desktopInputRef.current?.blur();
      mobileInputRef.current?.blur();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const openSearch = () => {
    setIsOpen(true);

    requestAnimationFrame(() => {
      desktopInputRef.current?.focus();
    });
  };

  const closeSearch = () => {
    setIsOpen(false);
    desktopInputRef.current?.blur();
    mobileInputRef.current?.blur();
  };

  const handleSelectUser = (user: {
    id: string;
    username?: string;
    name: string;
  }) => {
    navigate(`/profile/id/${user.id}`);

    setQuery("");
    setDebouncedQuery("");
    setIsOpen(false);

    onNavigate?.();
  };

  const showDropdown = isOpen && query.trim().length > 0;
  const isSearching = isLoading || isFetching;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Desktop */}
      <div className="hidden md:block">
        <div
          className="relative h-10"
          style={{
            width: isOpen ? DESKTOP_SEARCH_WIDTH : 40,
            transition: "width 300ms ease-in-out",
          }}
        >
          {/* Search button */}
          <button
            type="button"
            onClick={openSearch}
            aria-label={DIC.search.users}
            aria-expanded={isOpen}
            className={`absolute right-0 top-0 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-text-secondary transition-colors duration-200 hover:bg-border/30 hover:text-text ${
              isOpen ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <AppIcon nameIcon="Search" size={18} />
          </button>

          {/* Expanded search input */}
          <div
            className={`absolute right-0 top-0 h-10 w-full origin-right transition-all duration-300 ${
              isOpen
                ? "pointer-events-auto scale-x-100 opacity-100"
                : "pointer-events-none scale-x-0 opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={closeSearch}
                aria-label={DIC.navigation.closeMenu}
              className="absolute right-0 top-0 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-r-lg text-text-tertiary transition-colors hover:text-text"
            >
              <AppIcon nameIcon="Close" size={16} />
            </button>

            <input
              ref={desktopInputRef}
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder={placeholder}
              className="h-10 w-full rounded-lg border border-border bg-card/70 py-2 pl-3 pr-10 text-sm text-text placeholder:text-text-tertiary backdrop-blur-sm transition-colors focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="w-full md:hidden">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 flex -translate-y-1/2 items-center text-text-tertiary">
            <AppIcon nameIcon="Search" size={16} />
          </span>

          <input
            ref={mobileInputRef}
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (query.trim()) {
                setIsOpen(true);
              }
            }}
            placeholder={placeholder}
            className="w-full rounded-lg border border-border bg-card/70 py-2 pl-9 pr-3 text-sm text-text placeholder:text-text-tertiary backdrop-blur-sm transition-colors focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      {/* Search results */}
      <div
        className={`absolute right-0 top-full z-50 mt-2 w-[min(260px,calc(100vw-2rem))] max-h-80 overflow-y-auto rounded-xl border border-border bg-card shadow-2xl transition-all duration-150 ease-out ${
          showDropdown
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-1 scale-[0.98] opacity-0"
        }`}
      >
        {showDropdown && (
          <>
            {!shouldSearch ? (
              <div className="px-4 py-4 text-center text-sm text-text-secondary">
                Enter at least 2 characters
              </div>
            ) : isSearching ? (
              <div className="flex items-center justify-center py-6">
                <AppSpinner size={22} />
              </div>
            ) : isError ? (
              <div className="px-4 py-4 text-center text-sm text-danger">
                Error searching users
              </div>
            ) : results.length === 0 ? (
              <div className="px-4 py-4 text-center text-sm text-text-secondary">
                No users found
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {results.map((user) => {
                  const handle =
                    user.username ||
                    user.name.toLowerCase().replace(/\s+/g, "");

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
          </>
        )}
      </div>
    </div>
  );
}

export default AppSearch;
