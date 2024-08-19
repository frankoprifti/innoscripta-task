"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

type SearchContextType = {
  query: string;
  from?: string;
  to?: string;
  sources?: string;
  setQuery: (query: string) => void;
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  setSources: (sources: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState<string>("");
  const [from, setFrom] = useState<string | undefined>(undefined);
  const [to, setTo] = useState<string | undefined>(undefined);
  const [sources, setSources] = useState<string | undefined>(undefined);

  return (
    <SearchContext.Provider
      value={{
        query,
        from,
        to,
        sources,
        setQuery,
        setFrom,
        setTo,
        setSources,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
