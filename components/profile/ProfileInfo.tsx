// ✅ components/profile/ProfileInfo.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Profile } from "@prisma/client";
import EditProfileWrapper from "./EditProfileWrapper";


const ProfileInfo = ({ profile }: { profile: Profile }) => {
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setDateStr(new Date(profile.createdAt).toLocaleDateString());
  }, [profile.createdAt]);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image
            src={profile.profileImage}
            alt={profile.userName}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-gray-500">@{profile.userName}</p>
            <p className="text-gray-600">{profile.email}</p>
          </div>
        </div>
        <EditProfileWrapper profile={profile} />

      </div>
      <div className="text-sm text-gray-500">
        Profile created: {dateStr || "Loading..."}
      </div>
    </div>
  );
};

export default ProfileInfo;
