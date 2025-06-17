import LoadingCard from "@/components/card/LoadingCard";
import LandmarkContainer from "../components/home/LandmarkContainer";
import { Suspense } from "react";

type tParams = Promise<{ search?: string; category?: string }>;

const page = async ({ searchParams }: { searchParams: tParams }) => {
  const { search, category }: { search?: string; category?: string } =
    await searchParams;

  return (
    <section>
      <Suspense fallback={<LoadingCard />}>
        <LandmarkContainer search={search} category={category} />
      </Suspense>
    </section>
  );
};
export default page;
