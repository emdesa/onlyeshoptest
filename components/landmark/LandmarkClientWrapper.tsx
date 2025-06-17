// components/landmark/LandmarkClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const Maplandmark = dynamic(() => import("@/components/map/Maplandmark"), {
  ssr: false,
});

const LandmarkClientWrapper = ({ lat, lng }: { lat: number; lng: number }) => {
  return <Maplandmark location={{ lat, lng }} />;
};

export default LandmarkClientWrapper;
