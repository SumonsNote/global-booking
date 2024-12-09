import Image from "next/image";
import { CreateReview } from "./CreateReview";

export const CardReview = ({ reviews, name, image, hotelId, userId }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl text-start font-bold text-gray-800 mt-10 ">
        {reviews.length === 0
          ? "No Reviews Available"
          : `${reviews.length} ${reviews.length === 1 ? "Review" : "Reviews"}`}
      </h2>
      <div className="flex mt-20 overflow-y-auto h-96 flex-col p-4 bg-white shadow-md rounded-lg w-full max-w-3xl mx-auto space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="flex flex-col w-full p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-2"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image
                  src={image ? image : "/default-avatar.svg"}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <span className="text-lg font-semibold text-gray-800">
                  {name}
                </span>
              </div>
              <div>
                <Image src="/dot-menu.svg" alt="dots" width={20} height={20} />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-base font-medium text-gray-700 py-1">
                {review.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {review.review}
              </p>
            </div>
          </div>
        ))}
        <div className="flex flex-col space-y-2">
          <CreateReview hotelId={hotelId} userId={userId} />
        </div>
      </div>
    </div>
  );
};
