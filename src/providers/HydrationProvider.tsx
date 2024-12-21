"use client";
import React, { useEffect, useState } from "react";

const HydrationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    // To Prevent the Hydration Error
    return null;
  }
  return <div>{children}</div>;
};

export default HydrationProvider;
