import { FiActivity } from "react-icons/fi";

export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const accountMenuOptions = [
  {
    name: "Home",
    href: "/",
    lineIcon: FiActivity,
    filledIcon: FiActivity,
  },
];

export const exploreMenuOptions = [
  {
    name: "Account",
    href: "/account",
    isProtected: true,
  },
  {
    name: "Explore spaces",
    href: "/",
    isProtected: false,
  },
  {
    name: "For teams",
    href: "https://trybase.co/teams",
    isProtected: false,
  },
  {
    name: "Check in to a space",
    href: "/check-in",
    isProtected: false,
  },

  {
    name: "Support",
    href: "/account/support",
    isProtected: true,
  },
];
