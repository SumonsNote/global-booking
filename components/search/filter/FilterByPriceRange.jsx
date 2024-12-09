"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const FilterByPriceRange = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedRanges, setSelectedRanges] = useState([]);

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSelectedRanges((prev) =>
      checked ? [...prev, name] : prev.filter((range) => range !== name)
    );
  };

  useEffect(() => {
    const priceRange = params.get("priceRange");
    if (priceRange) {
      setSelectedRanges(priceRange.split("|"));
    }
  }, [searchParams, params]);

  useEffect(() => {
    if (selectedRanges.length > 0) {
      params.set("priceRange", selectedRanges.join("|"));
    } else {
      params.delete("priceRange");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [selectedRanges, params, pathname, replace]);

  return (
    <div>
      <h3 className="font-bold text-lg">Price Range</h3>
      <form className="flex flex-col gap-2 mt-2">
        {["range1", "range2", "range3", "range4", "range5", "range6"].map(
          (range, idx) => (
            <label key={range} htmlFor={range}>
              <input
                type="checkbox"
                name={range}
                id={range}
                onChange={handleChange}
                checked={selectedRanges.includes(range)}
              />
              $
              {
                [
                  "500 - 1000",
                  "1000 - 2000",
                  "2000 - 3000",
                  "3000 - 4000",
                  "4000 - 5000",
                  "5000+",
                ][idx]
              }
            </label>
          )
        )}
      </form>
    </div>
  );
};

export default FilterByPriceRange;
