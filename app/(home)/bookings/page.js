import { auth } from "@/auth";
import ProfileInfo from "@/components/user/ProfileInfo";
import PastBooking from "@/components/user/booking/PastBooking";
import UpcomingBooking from "@/components/user/booking/UpcomingBooking";

import { getBookingByUser, getUserByEmail } from "@/database/queries";
import { redirect } from "next/navigation";

const BookingsPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const loggedInUser = await getUserByEmail(session?.user?.email);
  const booking = await getBookingByUser(loggedInUser?.id);

  const pastBookings = booking.filter((booking) => {
    return new Date().getTime() > new Date(booking.checkin).getTime();
  });

  const upcomingBookings = booking.filter((booking) => {
    return new Date().getTime() < new Date(booking.checkin).getTime();
  });

  return (
    <>
      <section className="mt-[100px]">
        <div className="container">
          <ProfileInfo />
        </div>
      </section>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PastBooking bookings={pastBookings} />
            <UpcomingBooking bookings={upcomingBookings} />
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingsPage;