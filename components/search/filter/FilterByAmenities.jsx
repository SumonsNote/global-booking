"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const amenitiesList = [
  { name: "wifi", label: "Wi-fi" },
  { name: "swimming-pool", label: "Swimming Pool" },
  { name: "gym", label: "Gym" },
  { name: "golf-club", label: "Golf Club" },
];

const SortByAmenities = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSelectedAmenities((prev) =>
      checked ? [...prev, name] : prev.filter((amenity) => amenity !== name)
    );
  };

  useEffect(() => {
    const amenitiesFromParams = params.get("amenities");
    if (amenitiesFromParams) {
      setSelectedAmenities(amenitiesFromParams.split("|"));
    }
  }, [searchParams, params]);

  useEffect(() => {
    if (selectedAmenities.length > 0) {
      params.set("amenities", selectedAmenities.join("|"));
    } else {
      params.delete("amenities");
    }
    replace(`?${params.toString()}`);
  }, [selectedAmenities, params, pathname, replace]);

  useEffect(() => {
    // Populate selectedAmenities state from the URL parameters
    const amenitiesFromParams = params.get("amenities");
    if (amenitiesFromParams) {
      setSelectedAmenities(amenitiesFromParams.split("|"));
    }
  }, [searchParams, params]);

  useEffect(() => {
    // Update the URL parameters based on selected amenities
    if (selectedAmenities.length > 0) {
      params.set("amenities", selectedAmenities.join("|"));
    } else {
      params.delete("amenities");
    }
    replace(`?${params.toString()}`);
  }, [selectedAmenities, params, replace, pathname]);

  return (
    <div>
      <h3 className="font-bold text-lg">Amenities</h3>
      <form className="flex flex-col gap-2 mt-2">
        {amenitiesList.map((amenity) => (
          <label key={amenity.name} htmlFor={amenity.name}>
            <input
              type="checkbox"
              name={amenity.name}
              id={amenity.name}
              checked={selectedAmenities.includes(amenity.name)}
              onChange={handleChange}
            />
            {amenity.label}
          </label>
        ))}
      </form>
    </div>
  );
};

export default SortByAmenities;
