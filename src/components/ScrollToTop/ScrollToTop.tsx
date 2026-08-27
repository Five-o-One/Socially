/** @file Floating button for smoothly scrolling the page back to the top. */
import { useEffect, useState } from "react";
import AppIcon from "@/components/AppIcon/AppIcon";

const SHOW_AFTER = 300;

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SHOW_AFTER);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-text shadow-md backdrop-blur-md transition-all duration-300 hover:bg-border/50 focus:outline-none focus:ring-2 focus:ring-brand/50 ${
        isVisible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-3 scale-90 opacity-0"
      }`}
    >
      <AppIcon nameIcon="ArrowUp" size={18} />
    </button>
  );
}

export default ScrollToTop;
