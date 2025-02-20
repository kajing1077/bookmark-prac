// 'use client'
//
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList, navigationMenuTriggerStyle
// } from "@/components/ui/navigation-menu";
// import Link from "next/link";
// import { auth } from "@/app/lib/auth";
//
// export default async function NavLogin() {
//   const session = await auth();
//
//
//   return <>
//     <NavigationMenu>
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <Link href="/login" legacyBehavior passHref>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               {session ? 'Logout' : 'Login'}
//             </NavigationMenuLink>
//           </Link>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   </>
// }
"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { handleGlobalLogout } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { SessionUser } from "@/app/lib/session";

interface NavLoginProps {
  user: SessionUser | null;
}

export default function NavLogin({ user }: NavLoginProps) {
  const router = useRouter();

  const handleClick = async () => {
    if (user) {
      const isNaverLogout = await handleGlobalLogout();

      if (isNaverLogout) {
        // 네이버 로그아웃인 경우 추가 처리
        window.location.href = "https://nid.naver.com/nidlogin.logout";
      }
      // 일반 로그아웃은 서버 액션에서 redirect 처리됨
    } else {
      router.push("/login");
    }
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {!user && (
          <NavigationMenuItem>
            <button
              onClick={() => router.push("/signup")}
              className={navigationMenuTriggerStyle()}
            >
              Sign Up
            </button>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <button
            onClick={handleClick}
            className={navigationMenuTriggerStyle()}
          >
            {user ? "Logout" : "Login"}
          </button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

//   return (
//     <NavigationMenu>
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <button
//             onClick={handleClick}
//             className={navigationMenuTriggerStyle()}
//           >
//             {user ? 'Logout' : 'Login'}
//           </button>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// }
