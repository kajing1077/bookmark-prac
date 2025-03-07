"use server";

import { auth, signOut } from "@/app/lib/auth";
import { redirect } from "next/navigation";

interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string;
}

export async function handleGlobalLogout() {
  const session = await auth();
  const user = session?.user as SessionUser;
  if (user?.provider === "naver") {
    try {
      // 1. 토큰 삭제 요청 / 만료 요청.
      await fetch(`${process.env.NEXTAUTH_URL}/api/auth/naver-disconnect`, {
        method: "POST",
      });

      // 2. 세션 제거
      await signOut({ redirect: false });

      return true; // 네이버 로그아웃이 필요함을 클라이언트에 알림
    } catch (error) {
      console.error("Server logout error:", error);
      return false;
    }
  }

  await signOut();
  redirect("/");
}
