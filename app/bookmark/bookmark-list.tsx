'use client'

import { startTransition, useOptimistic, useState } from 'react'
import BookmarkItem from "@/app/bookmark/bookmark-item";
import { deleteBookmarkAction, updateBookmarkAction } from "@/app/actions/bookmark";
import type { Bookmark } from '@prisma/client';

interface BookmarkListProps {
  initialBookmarks: Bookmark[];
}


export default function BookmarkList({
                                       initialBookmarks,
                                     }: BookmarkListProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [bookmarks, optimisticBookmark] = useOptimistic(
    initialBookmarks,
    (state, action: {
      id: string;
      type: 'delete' | 'update';
      newData?: { title: string; url: string };
    }) => {
      if (action.type === 'delete') {
        return state.filter(bookmark => bookmark.id !== action.id);
      }
      return state.map(bookmark =>
        bookmark.id === action.id && action.newData
          ? {...bookmark, ...action.newData}
          : bookmark
      );
    }
  );

  return (
    <>
      {/*<AddButton />*/}

      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          isSelected={openDropdownId === bookmark.id}
          onDeleteAction={async () => {
            startTransition(() => {
              optimisticBookmark({id: bookmark.id, type: 'delete'});
            });

            try {
              const result = await deleteBookmarkAction(bookmark.id);
              if (!result?.success) {
                throw new Error('Failed to delete');
              }
            } catch (error) {
              console.error('Delete failed:', error);
              // 에러 처리 로직
            }
          }}
          onEditAction={async (newData) => {
            const originalData = {
              title: bookmark.title,
              url: bookmark.url
            };


            startTransition(() => {
              optimisticBookmark({
                id: bookmark.id,
                type: 'update',
                newData
              });
            });

            const handleError = (message: string) => {
              // UI 복구
              startTransition(() => {
                optimisticBookmark({
                  id: bookmark.id,
                  type: 'update',
                  newData: originalData
                });
              });
              alert(message);
            };

            try {
              const formData = new FormData();
              formData.append('title', newData.title);
              formData.append('url', newData.url);

              const result = await updateBookmarkAction(bookmark.id, formData);
              if (!result.success) {
                handleError(result.error || '북마크 수정에 실패했습니다.');
              }
            } catch (error) {
              console.error('Update failed:', error);
              handleError('예상치 못한 오류가 발생했습니다.');
            }
          }}

          onDropdownChangeAction={(open) =>
            setOpenDropdownId(open ? bookmark.id : null)
          }
        />
      ))}
    </>
  );
}