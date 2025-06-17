"use client";

import { submitRatingAction } from "@/actions/actions";
import { Star } from "lucide-react";
import { useOptimistic, startTransition } from "react";
import { SignInButton } from "@clerk/nextjs";

const LandmarkRating = ({
  landmarkId,
  avgRating,
  count,
  isSignedIn,
}: {
  landmarkId: string;
  avgRating: number;
  count: number;
  isSignedIn: boolean;
}) => {
  const [optimisticRating, setOptimisticRating] = useOptimistic(avgRating);

  const handleRate = (score: number) => {
    if (!isSignedIn) return; // ไม่ทำอะไร (ปล่อยให้ onClick ด้านล่าง handle เอง)
    startTransition(() => {
      setOptimisticRating(score);
    });

    const formData = new FormData();
    formData.append("landmarkId", landmarkId);
    formData.append("score", score.toString());
    submitRatingAction(formData);
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const starIcon = (
          <Star
            key={star}
            className={`w-4 h-4 cursor-pointer ${
              star <= Math.round(optimisticRating)
                ? "text-yellow-500"
                : "text-gray-400"
            }`}
            onClick={() => handleRate(star)}
            strokeWidth={2}
            fill={
              star <= Math.round(optimisticRating) ? "currentColor" : "none"
            }
          />
        );

        // ✅ ถ้าไม่ได้ login → wrap ด้วย SignInButton
        return isSignedIn ? (
          starIcon
        ) : (
          <SignInButton key={star} mode="modal">
            {starIcon}
          </SignInButton>
        );
      })}
      <span className="ml-1 text-xs text-gray-500">({count})</span>
    </div>
  );
};

export default LandmarkRating;
