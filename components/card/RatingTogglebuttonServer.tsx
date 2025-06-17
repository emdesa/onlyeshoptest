import { auth } from "@clerk/nextjs/server";
import LandmarkRatingWrapper from "./LandmarkRatingWrapper";
import { fetchLandmarkRating } from "@/actions/actions";

const RatingTogglebuttonServer = async ({
  landmarkId,
}: {
  landmarkId: string;
}) => {
  const { userId } = await auth();

  const ratingData = await fetchLandmarkRating(landmarkId);

  // ✅ ส่ง prop isSignedIn ให้ LandmarkRatingWrapper
  return (
    <LandmarkRatingWrapper
      landmarkId={landmarkId}
      avgRating={ratingData.avgRating}
      count={ratingData.count}
      isSignedIn={!!userId}
    />
  );
};

export default RatingTogglebuttonServer;
