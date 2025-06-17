import { fetchLandmarkDetail } from "@/actions/actions";
import FavoriteTogglebutton from "@/components/card/FavoriteTogglebuttonServer";
import RatingTogglebuttonServer from "@/components/card/RatingTogglebuttonServer";
import Breadcrums from "@/components/landmark/Breadcrums";
import Description from "@/components/landmark/Description";
import ImageContainer from "@/components/landmark/ImageContainer";
import LandmarkClientWrapper from "@/components/landmark/LandmarkClientWrapper";
import ShareButton from "@/components/landmark/ShareButton";
import { redirect } from "next/navigation";

type tParams = Promise<{ id: string }>;

const LandmarkDetail = async ({ params }: { params: tParams }) => {
  const { id }: { id: string } = await params;
  const landmark = await fetchLandmarkDetail({ id });
  if (!landmark) redirect("/");

  return (
    <>
      <section className="max-w-5xl mx-auto px-4 py-6">
        <Breadcrums name={landmark.name} />

        <header className="flex justify-between items-start mt-4 mb-6">
          {/* Left: Title + Rating */}
          <div>
            <h1 className="text-4xl font-bold capitalize mb-2">
              {landmark.name}
            </h1>
            <RatingTogglebuttonServer landmarkId={id} />
          </div>

          {/* Right: Action buttons */}
          <div className="flex items-center gap-2">
            <ShareButton landmarkId={landmark.id} name={landmark.name} />
            <FavoriteTogglebutton landmarkId={landmark.id} />
          </div>
        </header>

        <ImageContainer mainImage={landmark.image} name={landmark.name} />

        <section className="mt-6 space-y-6">
          <Description description={landmark.description} />
          <LandmarkClientWrapper lat={landmark.lat} lng={landmark.lng} />
        </section>
      </section>
    </>
  );
};

export default LandmarkDetail;
