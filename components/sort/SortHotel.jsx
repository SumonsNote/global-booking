"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const SortHotel = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState([]);

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  useEffect(() => {
    const rate = params.get("rate");
    if (rate) {
      setQuery(rate);
    }
  }, [searchParams, params]);

  useEffect(() => {
    if (query) {
      params.set("rate", query);
    } else {
      params.delete("rate");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [query, params, pathname, replace]);

  return (
    <div>
      <h3 className="font-bold text-lg">Sort By</h3>
      <form className="flex flex-col gap-2 mt-2">
        <label htmlFor="highRate">
          <input
            onChange={handleChange}
            type="radio"
            value="highRate"
            id="highRate"
            checked={query === "highRate"}
          />{" "}
          Price High to Low
        </label>

        <label htmlFor="lowRate">
          <input
            onChange={handleChange}
            type="radio"
            value="lowRate"
            id="lowRate"
            checked={query === "lowRate"}
          />{" "}
          Price Low to High
        </label>
      </form>
    </div>
  );
};

export default SortHotel;
