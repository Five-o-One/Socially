import { useState } from "react";
import AppIcon from "../AppIcon/AppIcon";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="flex flex-row items-center justify-between w-full h-17 bg-header border border-border lg:px-60 md:px-3 px-2">
      <a className="text-xl font-mono font-bold" href="/">
        Socially
      </a>
      <div className="flex flex-row gap-4">
        <div className="md:hidden bg-btn-primary-bg p-2 rounded-xl">
          <AppIcon
            className="text-btn-primary-text"
            nameIcon="Moon"
            size={24}
          />
        </div>
        <div
          className="md:hidden bg-btn-primary-bg p-2 rounded-xl"
          onClick={() => setIsMenuOpen(true)}
        >
          <AppIcon
            className="text-btn-primary-text"
            nameIcon="Menu"
            size={24}
          />
        </div>
      </div>
      {/* add btn componenet and it will be showed */}
      <div className="hidden md:flex flex-row gap-4">
        {isLoggedIn ? (
          <>
            <button className="py-2 px-4 flex flex-row rounded-sm cursor-pointer">
              <AppIcon nameIcon="Home" />
              <p>Home</p>
            </button>
            <button className="py-2 px-4 flex flex-row rounded-sm cursor-pointer">
              <AppIcon nameIcon="Bell" />
              <p>Notification</p>
            </button>
            <button className="py-2 px-4 flex flex-row rounded-sm cursor-pointer">
              <AppIcon nameIcon="Person" />
              <p>Profile</p>
            </button>
          </>
        ) : (
          <>
            <button className="p-2 rounded-xl cursor-pointer">
              <AppIcon nameIcon="Moon" size={24} />
            </button>
            <button className="py-2 px-4 flex flex-row rounded-sm cursor-pointer">
              <AppIcon nameIcon="Home" />
              <p>Home</p>
            </button>
            <button className="px-4 py-2 rounded-xl bg-btn-primary-bg text-btn-primary-text cursor-pointer">
              Sign in
            </button>
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
                <button className="flex items-center gap-2">
                  <AppIcon nameIcon="Home" size={20} /> Home
                </button>
                <button className="flex items-center gap-2">
                  <AppIcon nameIcon="Bell" size={20} /> Notifications
                </button>
                <button className="flex items-center gap-2">
                  <AppIcon nameIcon="Person" size={20} /> Profile
                </button>
              </>
            ) : (
              <>
                <button className="flex items-center gap-2">
                  <AppIcon nameIcon="Home" size={20} /> Home
                </button>
                <button className="flex items-center gap-2">Sign in</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
