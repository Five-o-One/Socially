import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router";
import AppIcon from "@/components/AppIcon/AppIcon";
import { AppButton } from "@/components/AppButton";

interface AppNavbarProps {
  isLoggedIn?: boolean;
  username?: string;
  onLogout?: () => void;
}

export function AppNavbar({
  isLoggedIn = true,
  username = "samb.1376",
  onLogout,
}: AppNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "text-text font-bold bg-border/40"
        : "text-text-secondary hover:text-text hover:bg-border/20"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-header backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-mono font-bold tracking-tight text-text"
        >
          Socially
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-text transition-colors hover:bg-border/30 cursor-pointer"
          >
            <AppIcon nameIcon={isDarkMode ? "Moon" : "Light"} size={18} />
          </button>

          <NavLink to="/" className={navItemClass}>
            <AppIcon nameIcon="Home" size={18} />
            <span>Home</span>
          </NavLink>

          {isLoggedIn ? (
            <>
              <NavLink to="/notifications" className={navItemClass}>
                <AppIcon nameIcon="Bell" size={18} />
                <span>Notifications</span>
              </NavLink>

              <NavLink to={`/profile/${username}`} className={navItemClass}>
                <AppIcon nameIcon="Person" size={18} />
                <span>Profile</span>
              </NavLink>

              <AppButton
                variant="ghost"
                size="sm"
                icon="LogOut"
                onClick={onLogout}
                className="text-text-secondary hover:text-danger cursor-pointer"
              >
                LogOut
              </AppButton>
            </>
          ) : (
            <Link to="/login">
              <AppButton variant="primary" size="md">
                Sign in
              </AppButton>
            </Link>
          )}
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-text"
          >
            <AppIcon nameIcon={isDarkMode ? "Moon" : "Light"} size={18} />
          </button>

          <AppButton
            icon="Menu"
            size="md"
            variant="ghost"
            onClick={() => setIsMenuOpen(true)}
            className="border border-border"
          />
        </div>
      </div>

      {/* Mobile Drawer & Backdrop Portal (Direct DOM Check without state cascading) */}
      {typeof document !== "undefined" &&
        createPortal(
          <div
            className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${
              isMenuOpen
                ? "visible pointer-events-auto"
                : "invisible pointer-events-none"
            }`}
          >
            {/* Full-screen Backdrop */}
            <div
              className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                isMenuOpen ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Solid Drawer Panel */}
            <div
              className={`fixed top-0 right-0 h-full w-3/4 max-w-xs border-l border-border bg-card p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <span className="font-bold text-text">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-1 rounded-lg text-text-secondary hover:text-text hover:bg-border/30 transition-colors cursor-pointer"
                >
                  <AppIcon nameIcon="Close" size={20} />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-3">
                <NavLink
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={navItemClass}
                >
                  <AppIcon nameIcon="Home" size={18} />
                  <span>Home</span>
                </NavLink>

                {isLoggedIn ? (
                  <>
                    <NavLink
                      to="/notifications"
                      onClick={() => setIsMenuOpen(false)}
                      className={navItemClass}
                    >
                      <AppIcon nameIcon="Bell" size={18} />
                      <span>Notifications</span>
                    </NavLink>

                    <NavLink
                      to={`/profile/${username}`}
                      onClick={() => setIsMenuOpen(false)}
                      className={navItemClass}
                    >
                      <AppIcon nameIcon="Person" size={18} />
                      <span>Profile</span>
                    </NavLink>

                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onLogout?.();
                      }}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-danger hover:bg-danger/10 rounded-lg transition-colors mt-2 text-left cursor-pointer"
                    >
                      <AppIcon nameIcon="LogOut" size={18} />
                      <span>Log Out</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-4"
                  >
                    <AppButton variant="primary" fullWidth>
                      Sign In
                    </AppButton>
                  </Link>
                )}
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}

export default AppNavbar;
