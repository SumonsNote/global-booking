import { CardReview } from "@/components/CardReview";
import { getReviewsForAHotel } from "@/database/queries";

const Overview = async ({ overview, id, userId }) => {
  const reviews = await getReviewsForAHotel(id);
  const user = reviews[0]?.userId;
  const name = user?.name;
  const image = user?.image;
  return (
    <section>
      <div className="container py-8">
        <h2 className="font-bold text-xl my-4">Overview</h2>
        <p className="text-gray-600 leading-8 whitespace-pre-wrap">
          {overview.substring(0, 500) + "..."}
        </p>
        <CardReview
          reviews={reviews}
          name={name}
          image={image}
          userId={userId}
          hotelId={id}
        />
      </div>
    </section>
  );
};

export default Overview;
