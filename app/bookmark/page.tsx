import { getBookmarksAction } from "@/app/actions/bookmark";
import BookmarkList from "./bookmark-list";  // 새로운 컴포넌트
import AddButton from "@/app/bookmark/bookmark-add-button";
import SearchBar from "@/components/search-bar";


export default async function BookmarksPage({searchParams}: { searchParams: Promise<{ search: string }> }) {
  const params = await searchParams;

  const query = params.search ?? '';


  const initialBookmarks = await getBookmarksAction(query);

  return (
    <div>
      <div className="w-[400px] bg-indigo-50 rounded-xl m-2 p-2 relative">
        <SearchBar
          defaultValue={query}
        />
        <div className="max-w-md mx-auto bg-gray-50 rounded-xl m-2 pb-1 h-[calc(100vh-180px)] overflow-y-auto">
          <div className="pb-2 p-4">모든 북마크</div>

          <BookmarkList initialBookmarks={initialBookmarks}/>
        </div>
        <AddButton/>
      </div>
    </div>
  );
}