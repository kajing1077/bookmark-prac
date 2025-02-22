"use client";

import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar({ defaultValue = "" }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-2 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-3 h-3 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      {/*<input*/}
      {/*  type="text"*/}
      {/*  // value={value}*/}
      {/*  // onChange={onChange}*/}
      {/*  // placeholder={placeholder}*/}
      {/*  className="block w-full p-2 ps-10 text-sm text-gray-900 rounded-full bg-gray-50"*/}
      {/*/>*/}
      <input
        type="text"
        defaultValue={defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="북마크 검색..."
        className="block w-full p-2 ps-10 text-sm text-gray-900 rounded-full bg-gray-50"
      />
      {isPending && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent" />
        </div>
      )}
    </div>
  );
}
