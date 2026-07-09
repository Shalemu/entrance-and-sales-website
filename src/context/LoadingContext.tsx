"use client";

import React, { createContext, useContext, useState } from "react";
import Loader from "@/components/Common/Loader";

type LoadingContextType = {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

export function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        showLoading,
        hideLoading,
      }}
    >
      {children}

      {loading && <Loader />}
    </LoadingContext.Provider>
  );
}


export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error(
      "useLoading must be used inside LoadingProvider"
    );
  }

  return context;
}