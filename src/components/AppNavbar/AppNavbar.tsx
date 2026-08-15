import { useState } from "react";
import AppIcon from "../AppIcon/AppIcon";
import { AppButton } from "../AppButton";
import { NavLink } from "react-router";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="flex flex-row items-center justify-between w-full h-17 bg-header border border-border lg:px-60 md:px-3 px-2">
      <a className="text-xl font-mono font-bold" href="/">
        Socially
      </a>
      <div className="flex flex-row gap-4">
        <div className="md:hidden">
          <AppButton
            icon="Light"
            size="md"
            variant="ghost"
            className="md:hidden border border-border shadow-sm"
          />
        </div>
        <AppButton
          icon="Menu"
          size="md"
          variant="primary"
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden"
        />
      </div>
      {/* add btn componenet and it will be showed */}
      <div className="hidden md:flex flex-row gap-4">
        {isLoggedIn ? (
          <>
            <NavLink to="/">
              <AppButton
                size="md"
                icon="Home"
                variant="ghost"
                className="cursor-pointer"
              >
                Home
              </AppButton>
            </NavLink>
            <NavLink to="/notifications">
              <AppButton
                size="md"
                icon="Bell"
                variant="ghost"
                className="cursor-pointer"
              >
                Notification
              </AppButton>
            </NavLink>
            <NavLink to="/profile/:username">
              <AppButton
                size="md"
                icon="Person"
                variant="ghost"
                className="cursor-pointer"
              >
                Profile
              </AppButton>
            </NavLink>
          </>
        ) : (
          <>
            <AppButton
              icon="Light"
              size="md"
              variant="ghost"
              className="border border-border shadow-sm cursor-pointer"
            ></AppButton>
            <NavLink to={"/"}>
              <AppButton
                size="md"
                icon="Home"
                variant="ghost"
                className="cursor-pointer"
              >
                Home
              </AppButton>
            </NavLink>
            <NavLink to="/profile/:username">
              <AppButton size="md" className="cursor-pointer">
                Sign in
              </AppButton>
            </NavLink>
          </>
        )}
      </div>
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-4/6 bg-card border-l border-border z-50 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-row justify-between">
            <h2 className="font-semibold">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)}>
              <AppIcon nameIcon="Close" size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-5 px-5">
            {isLoggedIn ? (
              <>
                <NavLink to="/">
                  <AppButton className="flex items-center gap-2">
                    Home
                  </AppButton>
                </NavLink>
                <NavLink to="/notifications">
                  <AppButton className="flex items-center gap-2">
                    <AppIcon nameIcon="Bell" size={20} /> Notifications
                  </AppButton>
                </NavLink>
                <NavLink to="/profile/:username">
                  <AppButton className="flex items-center gap-2">
                    <AppIcon nameIcon="Person" size={20} /> Profile
                  </AppButton>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/">
                  <AppButton className="flex items-center gap-2">
                    Home
                  </AppButton>
                </NavLink>
                <NavLink to="/">
                  <AppButton className="flex items-center gap-2">
                    Sign In
                  </AppButton>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
