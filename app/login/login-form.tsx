// 'use client'
//
// import { signIn } from "@/app/lib/auth";
// import Link from "next/link";
// import { loginWithPassword } from "@/app/actions/sign";
// import Image from "next/image";
// import Form from "next/form";
//
//
// export default function LoginPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-900">로그인</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             또는{' '}
//             <Link href="/signup" className="text-blue-600 hover:text-blue-500">
//               새 계정 만들기
//             </Link>
//           </p>
//         </div>
//
//         <Form action={loginWithPassword} className="mt-8 space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 이메일
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 비밀번호
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//               />
//               <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                 로그인 상태 유지
//               </label>
//             </div>
//
//             <div className="text-sm">
//               <Link href="/forgot-password" className="text-blue-600 hover:text-blue-500">
//                 비밀번호를 잊으셨나요?
//               </Link>
//             </div>
//           </div>
//
//           <div>
//             <button
//               type="submit"
//               className="w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//             >
//               로그인
//             </button>
//           </div>
//         </Form>
//
//         <div className="mt-6">
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="bg-white px-2 text-gray-500">간편 로그인</span>
//             </div>
//           </div>
//
//           <form
//             action={async () => {
//               "use server"
//               await signIn("naver")
//             }}
//             className="mt-6"
//           >
//             <button
//               type="submit"
//               className="w-full h-12 relative bg-[#03C75A] rounded-md"  // 높이 지정
//             >
//               <Image
//                 src="/btnG_complete.png"
//                 alt="네이버로 계속하기"
//                 fill  // 부모 요소 크기에 맞춤
//                 className="hover:opacity-90 transition-opacity"  // 호버 효과
//                 style={{objectFit: 'contain'}}  // 이미지 비율 유지
//               />
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// //
// // export default function LoginPage() {
// //
// //   return <>
// //
// //
// //     <form action={loginWithPassword} className="mt-8 space-y-6">
// //       <div className="space-y-4">
// //         <div>
// //           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
// //             이메일
// //           </label>
// //           <input
// //             id="email"
// //             name="email"
// //             type="email"
// //             autoComplete="email"
// //             required
// //             className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
// //           />
// //         </div>
// //
// //         <div>
// //           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
// //             비밀번호
// //           </label>
// //           <input
// //             id="password"
// //             name="password"
// //             type="password"
// //             autoComplete="current-password"
// //             required
// //             className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
// //           />
// //         </div>
// //       </div>
// //
// //       <div className="flex items-center justify-between">
// //         <div className="flex items-center">
// //           <input
// //             id="remember-me"
// //             name="remember-me"
// //             type="checkbox"
// //             className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
// //           />
// //           <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
// //             로그인 상태 유지
// //           </label>
// //         </div>
// //
// //         <div className="text-sm">
// //           <Link href="/forgot-password" className="text-blue-600 hover:underline">
// //             비밀번호를 잊으셨나요?
// //           </Link>
// //         </div>
// //       </div>
// //
// //       <div>
// //         <button
// //           type="submit"
// //           className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
// //         >
// //           로그인
// //         </button>
// //       </div>
// //     </form>
// //
// //
// //     <form
// //       action={async () => {
// //         "use server"
// //         await signIn("naver")
// //       }}
// //     >
// //       <button type="submit">Signin with Naver</button>
// //     </form>
// //
// //   </>
// // }