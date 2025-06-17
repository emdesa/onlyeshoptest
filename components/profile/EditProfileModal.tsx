"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { updateProfileAction } from "@/actions/actions";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import { SubmitButton } from "../form/Buttons";
import { Pencil } from "lucide-react";
import type { Profile } from "@prisma/client";
import { DialogTitle } from "@radix-ui/react-dialog";

const EditProfileModal = ({ profile }: { profile: Profile }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ใช้ปุ่มแทน div เพื่อ accessibility */}
      <DialogTrigger
        asChild
      >
        <button
          type="button"
          className="ml-auto flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
          aria-label="Edit Profile"
        >
          <Pencil size={16} />
          Edit
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogTitle className="text-lg font-semibold mb-4">Edit Profile</DialogTitle>
        <FormContainer action={updateProfileAction}>
          <FormInput
            name="firstName"
            label="First Name"
            type="text"
            defaultValue={profile.firstName}
          />
          <FormInput
            name="lastName"
            label="Last Name"
            type="text"
            defaultValue={profile.lastName}
          />
          <FormInput
            name="userName"
            label="Username"
            type="text"
            defaultValue={profile.userName}
          />
          <SubmitButton text="Update" />
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
