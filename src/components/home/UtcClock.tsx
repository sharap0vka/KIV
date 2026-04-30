"use client";

import { useEffect, useState } from "react";

function formatUtcTime(date: Date): string {
  const pad = (value: number) => value.toString().padStart(2, "0");
  return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
}

export function UtcClock() {
  const [value, setValue] = useState(() => formatUtcTime(new Date()));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setValue(formatUtcTime(new Date()));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return <span className="font-mono text-text-secondary">{value}</span>;
}
