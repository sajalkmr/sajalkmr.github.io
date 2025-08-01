"use client";

import { useEffect, useState } from "react";

/**
 * GDPR / data-privacy banner informing users about local visitor analytics.
 * Appears once per browser until dismissed (persisted in localStorage).
 */
export default function AnalyticsBanner() {
  const [visible, setVisible] = useState(false);

  // Check localStorage on mount (client-side only).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = window.localStorage.getItem("analyticsBannerDismissed");
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    try {
      window.localStorage.setItem("analyticsBannerDismissed", "true");
    } catch (e) {
      /* noop */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Analytics privacy notice"
      className="fixed bottom-0 inset-x-0 z-50 flex justify-center px-4"
    >
      <div className="mx-auto mb-4 flex max-w-3xl flex-col items-start gap-3 rounded-md bg-white/90 p-4 text-sm text-gray-800 shadow-lg backdrop-blur-md dark:bg-gray-900/90 dark:text-gray-100 sm:flex-row sm:items-center sm:gap-6">
        <span>
          This site logs visit counts to show real-time
          analytics. Nothing is shared with
          third-party trackers.
        </span>
        <button
          onClick={handleDismiss}
          className="whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
        >
          Got it
        </button>
      </div>
    </div>
  );
} 