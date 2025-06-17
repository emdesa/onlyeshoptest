"use client";
import { LandmarkCardProps } from "@/utils/types";
import MyLandmarkCard from "./MyLandmarkCard";

const MyLandmarkList = ({ landmarks }: { landmarks: LandmarkCardProps[] }) => {
  if (!landmarks || landmarks.length === 0) {
    return <p className="text-gray-500">You have no landmarks yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {landmarks.map((landmark) => (
        <MyLandmarkCard key={landmark.id} landmark={landmark} />
      ))}
    </div>
  );
};

export default MyLandmarkList;
