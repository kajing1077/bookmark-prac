'use server'

import 'server-only'
import { auth } from "../lib/auth"
import { prisma } from "../lib/db";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { getMetadata } from "@/app/actions/metadata";

// 북마크 생성
export async function createBookmarkAction(formData: FormData) {
  try {
    // 1. 세션 확인
    const session = await auth();
    console.log("Session:", session);  // 디버깅

    if (!session?.user?.email) {
      throw new Error('Not authenticated');
    }

    // 2. 입력 데이터 확인
    const userTitle = formData.get('title') as string;
    const url = formData.get('url') as string;
    // console.log("Input data:", {title, url});  // 디버깅


    // 3. 사용자 찾기
    const user = await prisma.user.findUnique({
      where: {email: session.user.email}
    });
    console.log("Found user:", user);  // 디버깅

    if (!user) {
      // 사용자가 없으면 생성
      const newUser = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || '',
          image: session.user.image || ''
        }
      });
      console.log("Created new user:", newUser);  // 디버깅
    }

    const metadata = await getMetadata(url);

    // 4. 북마크 생성
    const bookmark = await prisma.bookmark.create({
      data: {
        title: userTitle || metadata.ogTitle || metadata.title,
        url: url || metadata.url,
        image: metadata.image,
        owner: {
          connect: {
            email: session.user.email  // email로 연결
          }
        }
      }
    });
    console.log("Created bookmark:", bookmark);  // 디버깅

    revalidatePath('/bookmarks');

  } catch (error) {
    console.error('Detailed error:', error);  // 자세한 에러 로깅
    throw error;  // 에러를 그대로 전파
  }
}

// 북마크 조회
export async function getBookmarksAction(search?: string) {
  const session = await auth();
  if (!session?.user?.email) return [];

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      owner: {
        email: session.user.email
      },
      OR: search ? [
        {title: {contains: search}},
        {url: {contains: search}}
      ] : undefined
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  return bookmarks;
}

export async function deleteBookmarkAction(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error('Unauthorized');
    }

    // 북마크 삭제 시도
    try {
      await prisma.bookmark.delete({
        where: {id},
      });

      revalidatePath('/dashboard');
      return {success: true};
    } catch (error) {
      // 이미 삭제된 경우도 성공으로 처리
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {  // Prisma의 레코드 없음 에러 코드
          return {success: true};
        }
      }
      throw error;
    }
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    throw new Error('Failed to delete bookmark');
  }
}

export async function updateBookmarkAction(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error('Unauthorized');


  const title = formData.get('title') as string;
  const url = formData.get('url') as string;
  try {
    await prisma.bookmark.update({
      where: {
        id,
        owner: {
          email: session.user.email
        }
      },
      data: {title, url}
    });

    revalidatePath('/bookmarks');
    return {success: true};
  } catch (error) {
    console.error('Bookmark update failed:', error);
    return {
      success: false,
      error: '북마크 수정에 실패했습니다. 잠시 후 다시 시도해주세요.'
    };
  }
}