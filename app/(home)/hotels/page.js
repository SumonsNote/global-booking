import HotelList from "@/components/hotel/HotelList";
import Search from "@/components/search/Search";
import Filter from "@/components/search/filter/Filter";

const refinedCategory = (category) => {
  const decodedCategory = decodeURI(category);
  if (decodedCategory === "undefined") {
    return "";
  }
  return decodedCategory;
};

const HotelListPage = ({
  searchParams: {
    destination,
    checkin,
    checkout,
    category,
    rate,
    priceRange,
    amenities,
  },
}) => {
  return (
    <>
      <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
        <div className="container items-center py-12 ">
          <Search
            fromList={true}
            destination={destination}
            checkin={checkin}
            checkout={checkout}
          />
        </div>
      </section>
      <section className="py-12">
        <div className="container grid grid-cols-12">
          <Filter />

          <HotelList
            destination={destination}
            checkin={checkin}
            checkout={checkout}
            category={refinedCategory(category)}
            rate={rate}
            priceRange={priceRange}
            amenities={amenities}
          />
        </div>
      </section>
    </>
  );
};

export default HotelListPage;