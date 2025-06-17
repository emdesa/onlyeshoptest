"use client";

import dynamic from "next/dynamic";

// ปิด SSR เฉพาะ EditProfileModal
const EditProfileModal = dynamic(() => import("./EditProfileModal"), {
  ssr: false,
});

import type { Profile } from "@prisma/client";

const EditProfileWrapper = ({ profile }: { profile: Profile }) => {
  return <EditProfileModal profile={profile} />;
};

export default EditProfileWrapper;
