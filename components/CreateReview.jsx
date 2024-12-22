"use client";

import { submitReview } from "@/app/actions";
import { useState, useTransition } from "react";

export const CreateReview = ({ hotelId, userId }) => {
  const [review, setReview] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.set("review", review);
      formData.set("hotelId", hotelId);
      formData.set("userId", userId);

      try {
        const result = await submitReview(formData);
        setReview("");
      } catch (error) {
        throw error;
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <textarea
        name="review"
        placeholder="Give a review..."
        rows={4}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};
