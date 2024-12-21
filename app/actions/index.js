"use server";

import { signIn } from "@/auth";
import { reviewModel } from "@/models/review-model";
import { dbConnect } from "@/service/mongo";
import { revalidatePath } from "next/cache";

export async function login(formData) {
  try {
    await dbConnect();
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function submitReview(formData) {
  "use server";

  const review = formData.get("review");
  const hotelId = formData.get("hotelId");
  const userId = formData.get("userId");

  if (!hotelId || !userId) {
    throw new Error("hotelId and userId must be provided");
  }

  await dbConnect();

  const newReview = {
    review,
    hotelId,
    userId,
  };
  revalidatePath(`/hotels`);

  try {
    await reviewModel.create(newReview);
    return "Review has been created";
  } catch (error) {
    throw error;
  }
}
