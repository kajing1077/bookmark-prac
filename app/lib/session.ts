import { auth } from "@/app/lib/auth";

export type SessionUser = {
  email: string;
  name: string;
  provider?: string;
};

// 필요한 세션 정보만 추출하는 유틸리티 함수
export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth();

  if (!session?.user) return null;

  return {
    email: session.user.email!,
    name: session.user.name!
  };
}