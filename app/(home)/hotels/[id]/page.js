import { auth } from "@/auth";
import Gallery from "@/components/hotel/details/Gallery";
import Overview from "@/components/hotel/details/Overview";
import Summary from "@/components/hotel/details/Summary";

import { getHotelById, getUserByEmail } from "@/database/queries";

const HotelDetailsPage = async ({
  params: { id },
  searchParams: { checkin, checkout },
}) => {
  const session = await auth();
  const sessionUser = await getUserByEmail(session?.user?.email);
  const userId = sessionUser?.id;
  const hotelInfo = await getHotelById(id, checkin, checkout);

  return (
    <>
      <Summary hotelInfo={hotelInfo} checkin={checkin} checkout={checkout} />
      <Gallery gallery={hotelInfo?.gallery} />
      <Overview
        overview={hotelInfo?.overview}
        id={hotelInfo?.id}
        userId={userId}
      />
    </>
  );
};

export default HotelDetailsPage;
