"use client";

import { useEffect, useState } from "react";
import "./SplashScreen.css";

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

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader-line">
          <span></span>
        </div>
        <p className="loader-text">
          Powering Your Digital Growth...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}