import Image from "next/image";
import Link from "next/link";
import HotelRating from "./HotelRating";
import HotelReviewNumber from "./HotelReviewNumber";

const HotelSummaryInfo = ({ fromListPage, info, checkin, checkout }) => {
  let params = "";
  if (checkin && checkout) {
    params = `?checkin=${checkin}&checkout=${checkout}`;
  }
  return (
    <>
      <div className={fromListPage ? "flex-1" : "flex-1 container"}>
        <h2
          className={fromListPage ? "font-bold text-lg" : "font-bold text-2xl"}
        >
          {info?.name}
        </h2>
        <div className="flex items-center gap-2">
          <Image
            src="/location-icon.webp"
            alt="location"
            width={26}
            height={16}
          />
          <span>{info?.city}</span>
        </div>
        <div className="flex gap-2 items-center my-4 ">
          <HotelRating id={info?.id} />
          <HotelReviewNumber id={info?.id} />
          {info?.isBooked && <span>Sold Out</span>}
        </div>
        <div>
          <span className="bg-primary text-sm  text-white p-1 rounded-lg">
            {info?.propertyCategory} Star Property
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end justify-center">
        <h2 className="text-2xl font-bold text-right">
          ${(info?.highRate + info?.lowRate) / 2}/night
        </h2>
        <p className=" text-right">Per Night for 1 Room</p>
        {fromListPage ? (
          <Link
            href={`/hotels/${info?.id}${params}`}
            className="btn-primary rounded-full"
          >
            Details
          </Link>
        ) : (
          <Link
            href={info?.isBooked ? "#" : `/hotels/${info?.id}/payment${params}`}
            className={info?.isBooked ? "btn-disabled" : "btn-primary"}
          >
            Book
          </Link>
        )}
      </div>
    </>
  );
};

export default HotelSummaryInfo;
