"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, LoaderCircle, RotateCw, Star } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  size?: btnSize;
  text: string;
};

export const SubmitButton = ({ className, size, text }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      size={size}
      className={`${className} capitalize`}
    >
      {pending ? (
        <>
          <LoaderCircle className="animate-spin" />
          <span>Please wait...</span>
        </>
      ) : (
        <p>{text}</p>
      )}
    </Button>
  );
};

export const SignInCardButton = ({
  isFavorite = false,
  isRating = false,
}: {
  isFavorite?: boolean;
  isRating?: boolean;
}) => {
  return (
    <SignInButton mode="modal">
      <Button size="icon" variant="outline">
        {isFavorite ? (
          <Heart />
        ) : isRating ? (
          <Star />
        ) : (
          <Heart /> // default fallback
        )}
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" variant="outline">
      {
        pending
        ?<RotateCw className="animate-spin"/>
        :isFavorite
        ?<Heart fill="#ef4444"/>
        :<Heart />
      }
    </Button>
  );
};
