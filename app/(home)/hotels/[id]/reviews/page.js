import { auth } from "@/auth";
import { CardReview } from "@/components/CardReview";
import { getReviewsForAHotel, getUserByEmail } from "@/database/queries";

const ReviewPage = async ({ params }) => {
  const hotelId = params.id;
  const reviews = await getReviewsForAHotel(hotelId);
  const user = reviews[0]?.userId;

  const session = await auth();
  const sessionUser = await getUserByEmail(session?.user?.email);
  const userId = sessionUser?.id;

  const name = user?.name;
  const image = user?.image;

  return (
    <div className="mx-auto h-screen flex justify-center items-center">
      <CardReview
        reviews={reviews}
        name={name}
        image={image}
        hotelId={hotelId}
        userId={userId}
      />
    </div>
  );
};

export default ReviewPage;
