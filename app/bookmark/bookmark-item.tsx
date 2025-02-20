'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { EditBookmarkDialog } from "@/app/bookmark/bookmark-edit";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark } from "@prisma/client";

interface BookmarkItemProps {
  bookmark: Bookmark;  // Prisma 타입 사용
  onDeleteAction: () => Promise<void>;
  onEditAction: (newData: { title: string; url: string }) => void;
  onDropdownChangeAction: (open: boolean) => void;
  isSelected: boolean;
}


export default function BookmarkItem({
                                       bookmark,
                                       onDeleteAction,
                                       onEditAction,
                                       onDropdownChangeAction,
                                       isSelected
                                     }: BookmarkItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <div className={`
      relative flex flex-col p-4 hover:bg-gray-200 group
      ${isSelected ? 'bg-gray-200' : ''}
    `}>
      <Link
        href={bookmark.url}
        target="_blank"
        className="absolute inset-0 z-10"
      />

      <div className="flex items-center relative z-20">
        <a
          target="_blank"
          href={bookmark.url}
          rel="noopener noreferrer prefetch"
          className="flex-1 block h-full"
        >
          <div className="flex items-center gap-4">
            {bookmark.image ? (
              <Image
                className="rounded-md"
                src={bookmark.image}
                alt=""
                width={40}
                height={40}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                <span className="text-gray-400 text-xs">No img</span>
              </div>
            )}

            <div className="flex flex-col justify-center">
              <span className="text-base leading-tight truncate max-w-[280px]">
                {bookmark.title}
              </span>
              <span className="text-xs text-gray-500 align-middle">
                {bookmark.url}
              </span>
            </div>
          </div>
        </a>

        <DropdownMenu onOpenChange={onDropdownChangeAction}>
          <DropdownMenuTrigger asChild>
            <button
              className="p-2 cursor-pointer hover:bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <EllipsisVertical size={16}/>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
              Edit...
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
              <button
                onClick={async () => {
                  if (confirm("북마크를 삭제하시겠습니까?")) {
                    await onDeleteAction();
                  }
                }}
                className="w-full text-left text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <EditBookmarkDialog
          bookmark={bookmark}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onUpdateStart={onEditAction}
        />
      </div>
    </div>
  );
}
