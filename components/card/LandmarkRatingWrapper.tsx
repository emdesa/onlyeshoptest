import dynamic from "next/dynamic";

const LandmarkRating = dynamic(() => import("./LandmarkRating"));

const LandmarkRatingWrapper = ({
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
  return (
    <LandmarkRating
      landmarkId={landmarkId}
      avgRating={avgRating}
      count={count}
      isSignedIn={isSignedIn}
    />
  );
};

export default LandmarkRatingWrapper;
