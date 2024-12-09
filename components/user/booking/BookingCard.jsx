import { getHotelById } from "@/database/queries";
import { getDayDifference } from "@/utils/data-util";
import Image from "next/image";
import Link from "next/link";

const BookingCard = async ({ hotelId, checkin, checkout }) => {
  const hotelInfo = await getHotelById(hotelId);

  const days = getDayDifference(checkin, checkout);
  const totalCost = ((hotelInfo?.highRate + hotelInfo?.lowRate) / 2) * days;
  return (
    <div className="bg-[#ebf6e9] px-2 py-1 rounded-md">
      <div className="flex justify-between items-center ">
        <Link
          href={`/hotels/${hotelId}`}
          className="bg-gray-200 rounded-md p-2"
        >
          <span className="text-md font-semibold">{hotelInfo?.name}</span>

          <Image
            src={hotelInfo?.thumbNailUrl}
            alt={hotelInfo?.name}
            width={100}
            height={100}
          />
        </Link>

        <div className="flex flex-col items-end">
          <div>
            <h3 className="text-xl font-semibold text-right">${totalCost}</h3>
            <p className="text-sm text-gray-600">{`${
              totalCost / days
            } per night * ${days} days`}</p>
          </div>
          <div className="text-sm text-gray-600 my-4">
            <p>Check In: {checkin}</p>
            <p>Check Out: {checkout}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
