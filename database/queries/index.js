import { amenityModel } from "@/models/amenity-model";
import { bookingModel } from "@/models/booking-model";
import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";
import { trendingModel } from "@/models/trending-model";
import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

import { isDateInbetween } from "@/utils/data-util";

export async function getAllHotels(
  destination,
  checkin,
  checkout,
  category,
  rate,
  priceRange,
  amenities
) {
  await dbConnect();
  const regex = new RegExp(destination, "i");
  const hotelsByDestination = await hotelModel
    .find({ city: { $regex: regex } })
    .select([
      "thumbNailUrl",
      "name",
      "highRate",
      "lowRate",
      "city",
      "propertyCategory",
      "amenities",
    ])
    .populate({
      path: "amenities",
      model: amenityModel,
    })
    .lean();

  let allHotels = hotelsByDestination;

  if (category) {
    const categoriesToMatch = category.split("|");

    allHotels = allHotels.filter((hotel) => {
      return categoriesToMatch.includes(hotel.propertyCategory.toString());
    });
  }

  if (rate) {
    allHotels.forEach((hotel) => {
      hotel.avgRate = (hotel.highRate + hotel.lowRate) / 2;
    });

    allHotels.sort((a, b) => {
      return rate === "highRate"
        ? b.avgRate - a.avgRate
        : a.avgRate - b.avgRate;
    });
  }

  const priceRanges =
    typeof priceRange === "string" ? priceRange.split("|") : priceRange;

  if (priceRanges && priceRanges.length > 0) {
    allHotels = allHotels.filter((hotel) => {
      const avgRate = Math.round((hotel.highRate + hotel.lowRate) / 2);
      return priceRanges.some((range) => {
        switch (range) {
          case "range1":
            return avgRate >= 500 && avgRate <= 1000;
          case "range2":
            return avgRate > 1000 && avgRate <= 2000;
          case "range3":
            return avgRate > 2000 && avgRate <= 3000;
          case "range4":
            return avgRate > 3000 && avgRate <= 4000;
          case "range5":
            return avgRate > 4000 && avgRate <= 5000;
          case "range6":
            return avgRate > 5000;
          default:
            return false;
        }
      });
    });
  }

  if (checkin && checkout) {
    allHotels = await Promise.all(
      allHotels.map(async (hotel) => {
        const found = await findBooking(hotel._id, checkin, checkout);

        if (found) {
          hotel["isBooked"] = true;
        } else {
          hotel["isBooked"] = false;
        }
        return hotel;
      })
    );
  }

  const allAmenities = allHotels.flatMap((hotel) => {
    return hotel.amenities.map((amenity) =>
      amenity.name.toLowerCase().replace(/\s+/g, "-")
    );
  });

  if (amenities) {
    const amenitiesToMatch = amenities.split("|");

    allHotels = allHotels.filter((hotel) => {
      const hotelAmenities = hotel.amenities.map((amenity) =>
        amenity.name.toLowerCase().replace(/\s+/g, "-")
      );

      return amenitiesToMatch.every((amenity) =>
        hotelAmenities.includes(amenity)
      );
    });
  }

  return replaceMongoIdInArray(allHotels);
}

async function findBooking(hotelId, checkin, checkout) {
  await dbConnect();
  const matches = await bookingModel
    .find({ hotelId: hotelId.toString() })
    .lean();

  const found = matches.find((match) => {
    return (
      isDateInbetween(checkin, match.checkin, match.checkout) ||
      isDateInbetween(checkout, match.checkin, match.checkout)
    );
  });

  return found;
}

export async function getHotelById(hotelId, checkin, checkout) {
  await dbConnect();
  const hotel = await hotelModel.findById(hotelId).lean();

  if (checkin && checkout) {
    const found = await findBooking(hotel._id, checkin, checkout);
    if (found) {
      hotel["isBooked"] = true;
    } else {
      hotel["isBooked"] = false;
    }
  }
  return replaceMongoIdInObject(hotel);
}

export async function getRatingsForAHotel(hotelId) {
  await dbConnect();
  const ratings = await ratingModel.find({ hotelId: hotelId }).lean();
  return replaceMongoIdInArray(ratings);
}

export async function postAReview(hotelId, userId, review) {
  await dbConnect();
  const newReview = await reviewModel.create({ hotelId, userId, review });
  return replaceMongoIdInObject(newReview);
}

export async function getReviewsForAHotel(hotelId) {
  await dbConnect();
  const reviews = await reviewModel
    .find({ hotelId: hotelId })
    .populate({
      path: "userId",
      model: userModel,
    })
    .lean();

  return replaceMongoIdInArray(reviews);
}

export async function getUserByEmail(email) {
  await dbConnect();
  const users = await userModel.find({ email: email }).lean();
  return replaceMongoIdInObject(users[0]);
}

export async function getBookingByUser(userId) {
  await dbConnect();
  const bookings = await bookingModel.find({ userId: userId }).lean();
  return replaceMongoIdInArray(bookings);
}

export async function getTrendingHotels() {
  await dbConnect();
  const trendingHotels = await trendingModel.find().lean();
  return replaceMongoIdInArray(trendingHotels);
}
