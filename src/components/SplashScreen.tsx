"use client";

import { useEffect, useState } from "react";
import "./SplashScreen.css";

/**
 * Shows the intro loader when someone first opens the site, then reveals the page.
 *
 * The page itself is rendered and made ready *behind* the loader rather than after it, so the
 * two happen at the same time instead of one after the other. While the loader is up, every
 * entrance animation is held at its first frame (so nothing plays unseen) and the whole page is
 * covered, so the visitor sees only the intro. When the timer fires, the cover is removed and the
 * animations start — exactly the effect as before, but the page appears sooner.
 *
 * The page is also present in the server HTML, so search engines and link previews read it all.
 */
export default function SplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // The intro lasts 1.1 s counted from when the page started loading, not from when this code
    // began running. On a slow phone the code itself starts late, and counting from here used to
    // stack that delay on top of the intro (the page appeared after 3.6 s instead of 1.1 s).
    const timer = setTimeout(() => setLoading(false), Math.max(0, 1100 - performance.now()));
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div className="loader-wrapper" aria-hidden="true">
          <div className="loader-line">
            <span></span>
          </div>
          <p className="loader-text">Powering Your Digital Growth...</p>
        </div>
      )}
      <div className={loading ? "splash-hold" : undefined}>{children}</div>
    </>
  );
}
