import { auth } from "@/app/lib/auth";
import LogoutButton from "@/components/logout-btn";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {session ? (
          <div className="bg-white shadow rounded-lg p-6 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                어서오세요!
              </h2>
              <p className="text-gray-600">
                {session.user?.email}님
              </p>
            </div>

            <div className="space-y-4">
              <Link
                href='/bookmark'
                className="block w-full text-center bg-indigo-50 hover:bg-indigo-100
                          text-indigo-600 font-semibold py-3 px-4 rounded-md
                          transition duration-200"
              >
                북마크 보러가기
              </Link>

              <div className="pt-2">
                <LogoutButton />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Link
              href='/login'
              className="inline-block bg-blue-600 hover:bg-blue-700
                        text-white font-medium py-3 px-6 rounded-md
                        shadow-sm transition duration-200"
            >
              로그인하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}