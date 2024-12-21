import { getAllHotels } from "@/database/queries";
import HotelCard from "./HotelCard";
import NoHotels from "./NoHotels";

const HotelList = async ({
  destination,
  checkin,
  checkout,
  category,
  rate,
  priceRange,
  amenities,
}) => {
  const allHotels = await getAllHotels(
    destination,
    checkin,
    checkout,
    category,
    rate,
    priceRange,
    amenities
  );

  return (
    <div className="col-span-9">
      <div className="space-y-4">
        <span className=" font-bold my-2">
          Number of hotels: {allHotels.length}
        </span>
        {allHotels.length > 0 ? (
          allHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotelInfo={hotel}
              checkin={checkin}
              checkout={checkout}
            />
          ))
        ) : (
          <NoHotels />
        )}
      </div>
    </div>
  );
};

export default HotelList;
