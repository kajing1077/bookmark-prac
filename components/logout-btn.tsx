// 'use client'
//
// import { useSession } from "next-auth/react";
// import { handleLogout } from "@/app/actions/sign";
//
// export default function LogoutButton() {
//   const {data: session} = useSession();
//
//   // const handleLogout = async () => {
//   //   'use server'
//   //   try {
//   //     // 무조건 토큰 삭제 요청 시도
//   //     await fetch('/api/auth/naver-disconnect', {
//   //       method: 'POST',
//   //     });
//   //
//   //     // 로그아웃 진행
//   //     signOut({redirect: true, redirectTo: '/'});
//   //
//   //   } catch (error) {
//   //     console.error('Logout error:', error);
//   //     signOut({redirect: true, redirectTo: '/'});
//   //   }
//   // };
//
//
//   return (
//     <button onClick={() => handleLogout()} className="text-red-500 hover:underline">
//       로그아웃 ({session?.user?.provider || 'unknown'})
//     </button>
//   );
// }
// 'use client'
//
// import { useSession, signOut } from "next-auth/react";
//
// export default function LogoutButton() {
//   const {data: session} = useSession();
//
//   const handleLogout = async () => {
//     if (session?.user?.provider === 'naver') {
//       // 1. 토큰 삭제
//       await fetch('http://localhost:3000/api/auth/naver-disconnect', {
//         method: 'POST',
//       });
//
//       // 2. NextAuth 세션 제거
//       await signOut({ redirect: false });
//
//       // 3. 네이버 로그아웃 페이지로 리다이렉트
//       window.location.href = 'https://nid.naver.com/nidlogin.logout';
//     } else {
//       // 네이버가 아닌 경우 일반 로그아웃
//       signOut({ redirect:true, redirectTo: '/' });
//     }
//   };
//
//   return (
//     <button
//       onClick={handleLogout}
//       className="text-red-500 hover:underline"
//     >
//       로그아웃 ({session?.user?.provider || 'unknown'})
//     </button>
//   );
// }
// 'use client'
//
// import { useSession, signOut } from "next-auth/react";
//
// export default function LogoutButton() {
//   const {data: session} = useSession();
//
//   const handleLogout = async () => {
//     if (session?.user?.provider === 'naver') {
//       // 1. 토큰 삭제
//       await fetch('http://localhost:3000/api/auth/naver-disconnect', {
//         method: 'POST',
//       });
//
//       // 2. NextAuth 세션 제거
//       await signOut({redirect: false});
//
//       // 3. 네이버 로그아웃 필요
//       window.location.href = 'https://nid.naver.com/nidlogin.logout';
//     } else {
//       // 네이버가 아닌 경우 일반 로그아웃
//       signOut({redirect: true, redirectTo: '/'});
//     }
//   };
//
//   return (
//     <button
//       onClick={handleLogout}
//       className="text-red-500 hover:underline"
//     >
//       로그아웃 ({session?.user?.provider || 'unknown'})
//     </button>
//   );
// }
// 'use client'
//
// import { useSession, signOut } from "next-auth/react";
//
// export default function LogoutButton() {
//   const {data: session} = useSession();
//
//   const handleLogout = async () => {
//     if (session?.user?.provider === 'naver') {
//       try {
//         // 1. 토큰 삭제 및 연동 해제
//         await fetch('http://localhost:3000/api/auth/naver-disconnect', {
//           method: 'POST',
//         });
//
//         // 2. NextAuth 세션 제거
//         await signOut({redirect: false});
//
//         // 3. 네이버 로그아웃 페이지를 새 창으로 열기
//         window.open('https://nid.naver.com/nidlogin.logout', '_blank');
//
//         // 4. 홈으로 리다이렉트
//         window.location.href = '/';
//       } catch (error) {
//         console.error('Logout error:', error);
//         signOut({redirect: true, redirectTo: '/'});
//       }
//     } else {
//       // 네이버가 아닌 경우 일반 로그아웃
//       signOut({redirect: true, redirectTo: '/'});
//     }
//   };
//
//   return (
//     <button
//       onClick={handleLogout}
//       className="text-red-500 hover:underline"
//     >
//       로그아웃 ({session?.user?.provider || 'unknown'})
//     </button>
//   );
// }

'use client'

import { Button } from "@/components/ui/button";
import { handleGlobalLogout } from "@/app/actions/auth";

export default function LogoutButton() {
  const handleLogout = async () => {
    const needsNaverLogout = await handleGlobalLogout();

    if (needsNaverLogout) {
      window.open('https://nid.naver.com/nidlogin.logout', '_blank');
      window.location.href = '/';
    }
  };

  return (
    <Button
      variant='outline'
      onClick={handleLogout}
      className="w-full bg-red-50 hover:bg-red-100
                text-red-600 font-semibold py-3 px-4
                rounded-md transition duration-200"
    >
      로그아웃
    </Button>
  );
}