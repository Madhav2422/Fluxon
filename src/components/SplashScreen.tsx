"use client";

import { useEffect, useState } from "react";
import "./SplashScreen.css";

/** Hides the server-rendered copy for visitors without JavaScript too, and shows them the page. */
const NO_JS_CSS = "<style>.loader-wrapper{display:none!important}.splash-page{display:block!important}</style>";

/**
 * Shows the intro loader for 2.5 s when someone first opens the site, then mounts the site.
 *
 * The server also renders the full page into the HTML, hidden behind the loader, so Google and
 * link previews can read every page. In the browser that copy is kept as plain HTML and is not
 * hydrated (no extra work), and after the intro React mounts the live page in its place. Entrance
 * animations therefore still start right when the intro ends, exactly as before.
 */
export default function SplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return <>{children}</>;

  return (
    <>
      <div className="loader-wrapper">
        <div className="loader-line">
          <span></span>
        </div>
        <p className="loader-text">
          Powering Your Digital Growth...
        </p>
      </div>

      {typeof window === "undefined" ? (
        <div className="splash-page" style={{ display: "none" }}>
          {children}
        </div>
      ) : (
        // Same element as on the server, but React leaves its server-rendered contents untouched.
        <div className="splash-page" style={{ display: "none" }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} />
      )}

      <noscript dangerouslySetInnerHTML={{ __html: NO_JS_CSS }} />
    </>
  );
}
