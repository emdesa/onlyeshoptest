import { LandmarkCardProps } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import FavoriteTogglebuttonServer from "./FavoriteTogglebuttonServer";
import RatingTogglebuttonServer from "./RatingTogglebuttonServer";

const LandmarkCard = async ({ landmark }: { landmark: LandmarkCardProps }) => {
  const { name, image, id, description, price, province } = landmark;

  return (
    <article className="group relative mt-2">
      <Link href={`/landmark/${id}`}>
        <div className="relative h-[300px] rounded-md mb-2">
          <Image
            src={image}
            sizes="(max-width:768px) 100vw, 50vw"
            alt={name}
            fill
            className="object-cover rounded-md 
              group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        </Link>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold mt-1">
            {name.substring(0, 30)}
          </h3>
           <RatingTogglebuttonServer landmarkId={id} />

        </div>

        <p className="text-sm mt-1 text-muted-foreground">
          {description.length > 40
            ? description.substring(0, 40) + "..."
            : description}
        </p>

        <div
          className="mt-1 flex items-center justify-between 
            font-semibold text-sm"
        >
          <span>THB {price}</span>
          <p>{province}</p>
        </div>
      

      <div className="absolute top-5 right-5">
        <FavoriteTogglebuttonServer landmarkId={id} />
      </div>
    </article>
  );
};
export default LandmarkCard;
