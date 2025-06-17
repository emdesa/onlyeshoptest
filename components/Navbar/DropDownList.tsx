import { AlignLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import UserIcon from "./UserIcon";
import Link from "next/link";
import { links } from "@/utils/link";

import SignOutLinks from "./SignOutLinks";
import { SignedIn, SignedOut, SignInButton} from "@clerk/nextjs";

const DropDownList = () => {
  return (
    <div className="flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            <AlignLeft />
            <UserIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <SignedOut>
            <DropdownMenuItem>
              <SignInButton mode="modal">
                <button>Login</button>
              </SignInButton>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <SignInButton mode="modal">
                <button>Register</button>
              </SignInButton>
            </DropdownMenuItem>
          </SignedOut>

          <SignedIn>
            {links.map((item, index) => {
              return (
                <DropdownMenuItem key={index}>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <SignOutLinks />
            </DropdownMenuItem>
          </SignedIn>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default DropDownList;
