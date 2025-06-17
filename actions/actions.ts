"use server";

import {
  imageSchema,
  landmarkSchema,
  profileSchema,
  validatedWithZod,
} from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { deleteFileFromStorage, uploadFile } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("you must logged!!!");
  }
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.error("❌ SERVER ERROR:", error); // ✅ log error
  return {
    message: error instanceof Error ? error.message : "Server Error!!!",
  };
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please Login!!!");

    const rawData = Object.fromEntries(formData);
    const validatedField = validatedWithZod(profileSchema, rawData);
    console.log("validated=", validatedField);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedField,
      },
    });

    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });

    // return { message: "Create Profile Success!!" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  redirect("/");
};

export const createLandmarkAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;

    // console.log("validated=", file);

    const validatedFile = validatedWithZod(imageSchema, { image: file });
    const validatedField = validatedWithZod(landmarkSchema, rawData);

    const fullPath = await uploadFile(validatedFile.image);
    console.log(fullPath);

    await db.landmark.create({
      data: {
        ...validatedField,
        image: fullPath,
        profileId: user.id,
      },
    });

    //  return { message: "Create Landmark Success!!" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  redirect("/camp");
};

export const fetchLandmarks = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const landmarks = await db.landmark.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { province: { contains: search, mode: "insensitive" } },
      ],
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return landmarks;
};

export const fetchLandmarksHero = async () => {
  const landmarks = await db.landmark.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return landmarks;
};

export const fetchFavoriteId = async ({
  landmarkId,
}: {
  landmarkId: string;
}) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      landmarkId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  favoriteId: string | null;
  landmarkId: string;
  pathname: string;
}) => {
  const { favoriteId, landmarkId, pathname } = prevState;
  const user = await getAuthUser();
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          landmarkId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return { message: favoriteId ? "Remove favorite" : "Add Favorite" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      landmark: {
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
          province: true,
          lat: true,
          lng: true,
          category: true,
        },
      },
    },
  });
  return favorites.map((favorite) => favorite.landmark);
};

export const fetchLandmarkDetail = async ({ id }: { id: string }) => {
  return db.landmark.findFirst({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
};
// ลบ landmark
export const deleteLandmarkAction = async (landmarkId: string) => {
  const user = await getAuthUser();

  const landmark = await db.landmark.findUnique({
    where: { id: landmarkId },
  });

  if (landmark?.profileId !== user.id) {
    throw new Error("Unauthorized");
  }
  // ✅ ลบรูปจาก Supabase Storage
  if (landmark.image) {
    await deleteFileFromStorage(landmark.image);
  }

  // ✅ ลบจาก Database
  await db.landmark.delete({
    where: { id: landmarkId },
  });

  revalidatePath("/camp");
};
// fetchMyLandmarks
export const fetchMyLandmarks = async () => {
  const user = await getAuthUser();
  const landmarks = await db.landmark.findMany({
    where: {
      profileId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return landmarks;
};
//edit landmark
export const editLandmarkAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);

    const landmarkId = rawData.id as string;
    if (!landmarkId) throw new Error("Missing Landmark ID");

    const existingLandmark = await db.landmark.findUnique({
      where: { id: landmarkId },
    });

    if (!existingLandmark || existingLandmark.profileId !== user.id) {
      throw new Error("Unauthorized or Landmark not found");
    }

    const validatedField = validatedWithZod(landmarkSchema, rawData);

    let imagePath = existingLandmark.image;
    const file = formData.get("image") as File;

    if (file && file.size > 0) {
      // ✅ ตรวจสอบรูปใหม่ และอัปโหลด
      const validatedFile = validatedWithZod(imageSchema, { image: file });
      const newImagePath = await uploadFile(validatedFile.image);

      // ✅ ลบรูปเก่าหลังอัปโหลดใหม่สำเร็จ
      if (existingLandmark.image) {
        await deleteFileFromStorage(existingLandmark.image);
      }

      imagePath = newImagePath;
    }
    await db.landmark.update({
      where: { id: landmarkId },
      data: {
        ...validatedField,
        image: imagePath,
      },
    });

    revalidatePath("/camp"); // ✅ clear cache path /camp
  } catch (error) {
    return renderError(error); // ✅ show toast message ได้ใน client ถ้าคุณใช้ useActionState
  }

  redirect("/camp");
};

export const fetchLandmarkRating = async (landmarkId: string) => {
  const ratings = await db.rating.findMany({
    where: { landmarkId },
    select: { score: true },
  });

  const total = ratings.reduce((acc, curr) => acc + curr.score, 0);
  const avgRating = ratings.length ? total / ratings.length : 0;

  return {
    avgRating,
    count: ratings.length,
  };
};

export const submitRatingAction = async (formData: FormData) => {
  const user = await getAuthUser();

  const landmarkId = formData.get("landmarkId") as string;
  const score = parseInt(formData.get("score") as string);

  if (!landmarkId || isNaN(score) || score < 1 || score > 5) {
    throw new Error("Invalid data");
  }

  await db.rating.upsert({
    where: {
      profileId_landmarkId: {
        profileId: user.id,
        landmarkId,
      },
    },
    update: {
      score,
    },
    create: {
      profileId: user.id,
      landmarkId,
      score,
    },
  });

  revalidatePath(`/landmark/${landmarkId}`);

  return { message: "Rating submitted" };
};
//fetchProfile
export const fetchProfile = async () => {
  const user = await getAuthUser();

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!profile) {
    throw new Error("Profile not found!");
  }

  return profile;
};
//updateProfileAction
export const updateProfileAction = async (_: any, formData: FormData) => {
  try {
    const user = await getAuthUser();

    const rawData = Object.fromEntries(formData);
    const validated = validatedWithZod(profileSchema, rawData);

    await db.profile.update({
      where: { clerkId: user.id },
      data: validated,
    });

    revalidatePath("/profile");
    return { message: "Profile updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};
