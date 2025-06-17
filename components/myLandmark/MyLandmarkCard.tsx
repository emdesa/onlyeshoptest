"use client";

import { deleteLandmarkAction } from "@/actions/actions";
import Image from "next/image";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { LandmarkCardProps } from "@/utils/types";

const MyLandmarkCard = ({ landmark }: { landmark: LandmarkCardProps }) => {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this landmark?");
    if (confirmed) {
      await deleteLandmarkAction(landmark.id);
    }
  };

  const truncateDescription = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      <Image
        src={landmark.image}
        alt={landmark.name}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
        priority
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{landmark.name}</h2>
        <p className="text-sm text-gray-600">
          {truncateDescription(landmark.description, 50)}
        </p>
        <div className="flex justify-between mt-4">
          <Button asChild variant="outline">
            <Link
              href={`/camp/edit/${landmark.id}`}
              className="flex items-center gap-2 text-blue-600"
            >
              <SquarePen size={16} />
              Edit
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-600"
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyLandmarkCard;
