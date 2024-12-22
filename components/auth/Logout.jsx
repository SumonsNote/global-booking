"use client";
import { signOut } from "next-auth/react";
const Logout = () => {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "https://global-booking.vercel.app/login" });
      }}
    >
      Sign Out
    </button>
  );
};

export default Logout;
