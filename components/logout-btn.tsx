"use client";

import { Button } from "@/components/ui/button";
import { handleGlobalLogout } from "@/app/actions/auth";

export default function LogoutButton() {
  const handleLogout = async () => {
    const needsNaverLogout = await handleGlobalLogout();

    if (needsNaverLogout) {
      window.open("https://nid.naver.com/nidlogin.logout", "_blank");
      window.location.href = "/";
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="w-full bg-red-50 hover:bg-red-100
                text-red-600 font-semibold py-3 px-4
                rounded-md transition duration-200"
    >
      로그아웃
    </Button>
  );
}
