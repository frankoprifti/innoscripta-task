"use client";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useSearch } from "@/context/SearchContext";
import { useState, useEffect, ChangeEventHandler } from "react";
import { debounce } from "lodash";
import { NewsSources, fetchSourcesFromNewsApi } from "@/services/newsService";

export default function Filters() {
  const { query, setQuery, setFrom, setTo, setSources } = useSearch();
  const [localQuery, setLocalQuery] = useState(query);
  const [localFrom, setLocalFrom] = useState<string>("");
  const [localTo, setLocalTo] = useState<string>("");
  const [localSources, setLocalSources] = useState<string>("");
  const [newsSources, setNewsSources] = useState<NewsSources[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "from":
        setLocalFrom(value);
        break;
      case "to":
        setLocalTo(value);
        break;
      case "sources":
        setLocalSources(value);
        break;
      default:
        break;
    }
  };

  const applyFilters = () => {
    setQuery(localQuery);
    setFrom(localFrom);
    setTo(localTo);
    setSources(localSources);
  };

  const debouncedApplyFilters = debounce(applyFilters, 300);

  useEffect(() => {
    debouncedApplyFilters();
    return () => {
      debouncedApplyFilters.cancel();
    };
  }, [localQuery, localFrom, localTo, localSources]);

  const clearFilters = () => {
    setLocalQuery("");
    setLocalFrom("");
    setLocalTo("");
    setLocalSources("");
    setQuery("");
    setFrom("");
    setTo("");
    setSources("");
  };

  useEffect(() => {
    const fetchSources = async () => {
      const sources: NewsSources[] = await fetchSourcesFromNewsApi();
      setNewsSources(sources);
    };
    if (newsSources.length === 0) {
      fetchSources();
    }
  }, [newsSources]);

  return (
    <div className="flex flex-row w-full items-center gap-4 justify-center flex-wrap">
      <Input
        placeholder="Type to search..."
        type="search"
        value={localQuery}
        onChange={handleSearchChange}
        label="Search"
        className="w-[45%] md:max-w-28"
      />
      <Input
        type="date"
        name="from"
        value={localFrom || ""}
        onChange={handleFilterChange}
        placeholder="From"
        className="w-[45%] md:max-w-28"
        label="From"
      />
      <Input
        type="date"
        name="to"
        value={localTo || ""}
        onChange={handleFilterChange}
        placeholder="To"
        className="w-[45%] md:max-w-28"
        label="To"
      />
      <Select
        name="sources"
        label="Select source"
        placeholder="Select an source"
        className="w-[45%] md:max-w-28"
        selectionMode="multiple"
        onChange={handleFilterChange}
        selectedKeys={localSources.split(",")}
      >
        {newsSources?.map((source) => (
          <SelectItem key={source.id}>{source.name}</SelectItem>
        ))}
      </Select>
      <Button
        onClick={clearFilters}
        className="w-full md:max-w-28 mx-3 md:mx-0 md:h-14"
      >
        Clear
      </Button>
    </div>
  );
}
