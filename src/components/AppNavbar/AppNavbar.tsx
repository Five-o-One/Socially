import { useState, useEffect } from "react";
import AppPortal from "@/components/AppPortal/AppPortal";
import { Link, NavLink } from "react-router";
import AppIcon from "@/components/AppIcon/AppIcon";
import { AppButton } from "@/components/AppButton";
import { useAppStore } from "@/store";

/**
 * @component AppNavbar
 * @description Responsive navigation bar for authenticated and guest users.
 * @prop {boolean} isLoggedIn - Whether authenticated navigation is shown
 * @prop {string} [userId] - Current user ID used for the profile link
 * @prop {() => void} [onLogout] - Callback invoked when the user chooses to log out
 */
interface AppNavbarProps {
  isLoggedIn: boolean;
  userId?: string;
  onLogout?: () => void;
}

export function AppNavbar({ isLoggedIn, userId, onLogout }: AppNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { theme, toggleTheme } = useAppStore();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    document.documentElement.classList.add("scroll-locked");
    document.body.classList.add("scroll-locked");

    return () => {
      document.documentElement.classList.remove("scroll-locked");
      document.body.classList.remove("scroll-locked");
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
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
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-card text-text transition-colors hover:bg-border/30"
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

              <NavLink
                to={userId ? `/profile/id/${userId}` : "/"}
                className={navItemClass}
              >
                <AppIcon nameIcon="Person" size={18} />
                <span>Profile</span>
              </NavLink>

              <AppButton
                variant="ghost"
                size="sm"
                icon="LogOut"
                onClick={onLogout}
                className="cursor-pointer text-text-secondary hover:text-danger"
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

        {/* Mobile Actions */}
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

      {/* Mobile Drawer */}
      <AppPortal>
        <div
          className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${
            isMenuOpen
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMenu}
          />

          {/* Drawer */}
          <div
            className={`fixed top-0 right-0 h-full w-3/4 max-w-xs overflow-y-auto border-l border-border bg-card p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between border-b border-border pb-6">
              <span className="font-bold text-text">Menu</span>

              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="cursor-pointer rounded-lg p-1 text-text-secondary transition-colors hover:bg-border/30 hover:text-text"
              >
                <AppIcon nameIcon="Close" size={20} />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-3">
              <NavLink to="/" onClick={closeMenu} className={navItemClass}>
                <AppIcon nameIcon="Home" size={18} />
                <span>Home</span>
              </NavLink>

              {isLoggedIn ? (
                <>
                  <NavLink
                    to="/notifications"
                    onClick={closeMenu}
                    className={navItemClass}
                  >
                    <AppIcon nameIcon="Bell" size={18} />
                    <span>Notifications</span>
                  </NavLink>

                  <NavLink
                    to={userId ? `/profile/id/${userId}` : "/"}
                    className={navItemClass}
                  >
                    <AppIcon nameIcon="Person" size={18} />
                    <span>Profile</span>
                  </NavLink>

                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      onLogout?.();
                    }}
                    className="mt-2 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-danger transition-colors hover:bg-danger/10"
                  >
                    <AppIcon nameIcon="LogOut" size={18} />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={closeMenu} className="mt-4">
                  <AppButton variant="primary" fullWidth>
                    Sign In
                  </AppButton>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </AppPortal>
    </header>
  );
}

export default AppNavbar;
