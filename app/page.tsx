import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-8">
      <header className="text-center">{/* 헤더 내용 */}</header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome</h1>
          <p className="text-lg text-gray-600 mb-8">Bookmark service</p>
          <div className="space-x-4">
            <Link
              href="/login"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition-colors"
            >
              시작하기
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-center text-gray-500 py-4">
        {/* 푸터 내용 */}
      </footer>
    </div>
  );
}
