import { useState } from "react";
import { Link, NavLink } from "react-router";
import AppIcon from "@/components/AppIcon/AppIcon";
import { AppButton } from "@/components/AppButton";

interface AppNavbarProps {
  isLoggedIn?: boolean;
  username?: string;
}

export function AppNavbar({ isLoggedIn = true, username = "samb.1376" }: AppNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
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
        <Link to="/" className="text-xl font-mono font-bold tracking-tight text-text">
          Socially
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-text transition-colors hover:bg-border/30"
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

              <AppButton variant="ghost" size="sm" icon="LogOut" className="text-text-secondary hover:text-danger">
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

        {/* Mobile Buttons */}
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

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Drawer Content */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-3/4 max-w-xs border-l border-border bg-card p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <span className="font-bold text-text">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className="text-text-secondary hover:text-text"
          >
            <AppIcon nameIcon="Close" size={20} />
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-3">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={navItemClass}>
            <AppIcon nameIcon="Home" size={18} />
            <span>Home</span>
          </NavLink>

          {isLoggedIn ? (
            <>
              <NavLink to="/notifications" onClick={() => setIsMenuOpen(false)} className={navItemClass}>
                <AppIcon nameIcon="Bell" size={18} />
                <span>Notifications</span>
              </NavLink>

              <NavLink to={`/profile/${username}`} onClick={() => setIsMenuOpen(false)} className={navItemClass}>
                <AppIcon nameIcon="Person" size={18} />
                <span>Profile</span>
              </NavLink>

              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-danger hover:bg-danger/10 rounded-lg transition-colors mt-2"
              >
                <AppIcon nameIcon="LogOut" size={18} />
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mt-4">
              <AppButton variant="primary" fullWidth>
                Sign In
              </AppButton>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default AppNavbar;