'use server'

import { signIn } from "../lib/auth"
import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/db";
import { hash } from 'bcryptjs';
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";

export const login = async (service: string) => {
  await signIn(service, {redirect: true, redirectTo: '/dashboard'});
}

export async function loginWithPassword(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;


  if (!email || !password) {
    return { error: '이메일과 비밀번호를 입력해주세요.' };
  }

  // if (!email || !password) {
  //   throw new Error('이메일과 비밀번호를 입력해주세요.');
  // }

  try {
    // 1. 사용자 찾기

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (result?.error) {
      return { error: '이메일 또는 비밀번호가 일치하지 않습니다.' };
    }

    // if (result?.error) {
    //   throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
    // }

    redirect('/dashboard');

    // const user = await prisma.user.findUnique({
    //   where: { email },
    //   include: { Password: true }
    // });
    //
    // if (!user || !user.Password) {
    //   throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
    // }
    //
    // // 2. 비밀번호 확인
    // const isValid = await compare(password, user.Password.hash);
    // if (!isValid) {
    //   throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
    // }

    // 3. NextAuth 세션 생성
    // await signIn("credentials", {
    //   email,
    //   password,
    //   redirect: false,
    // });
    //
    // // 4. 리다이렉트
    // redirect('/dashboard');

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: '이메일 또는 비밀번호가 일치하지 않습니다.'}
          // throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
        default:
          return { error: '로그인 중 오류가 발생했습니다.' };
          // throw new Error('로그인 중 오류가 발생했습니다.');
      }
    }
    throw error;
  }
}


export async function signUp(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    if (!email || !password) {
      throw new Error('이메일과 비밀번호는 필수입니다.');
    }

    // 이메일 중복 체크
    const existingUser = await prisma.user.findUnique({
      where: {email}
    });

    if (existingUser) {
      throw new Error('이미 사용 중인 이메일입니다.');
    }

    // 비밀번호 해시화
    const hashedPassword = await hash(password, 10);

    // User와 Password를 한 번에 생성
    await prisma.user.create({
      data: {
        email,
        name,
        Password: {
          create: {
            hash: hashedPassword
          }
        }
      }
    });

    revalidatePath('/');
    redirect('/login');

  } catch (error) {
    console.error('SignUp error:', error);
    throw error;
  }
}

// export const handleLogout = async () => {
//   try {
//     const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
//
//     // 토큰 삭제 요청
//     await fetch(`${baseUrl}/api/auth/naver-disconnect`, {
//       method: 'POST',
//     });
//
//     // 세션 삭제
//     await signOut();
//
//     // 리다이렉트
//     redirect('/');
//
//   } catch (error) {
//     console.error('Logout error:', error);
//     redirect('/');
//   }
// };

export async function signInWithNaver() {
  'use server'
  await signIn("naver");
}