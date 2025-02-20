'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateBookmarkAction } from "@/app/actions/bookmark"
import { useFormStatus } from "react-dom";
import Form from "next/form";

interface EditBookmarkDialogProps {
  bookmark: {
    id: string
    title: string
    url: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void;
  onUpdateStart: (newData: { title: string; url: string }) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="disabled:opacity-50"
    >
      {pending ? "저장 중..." : "저장"}
    </Button>
  );
}


export function EditBookmarkDialog({bookmark, open, onOpenChange,   onUpdateStart }: EditBookmarkDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>북마크 수정</DialogTitle>
        </DialogHeader>
        <Form action={async (formData: FormData) => {
          const title = formData.get('title') as string;
          const url = formData.get('url') as string;
          onUpdateStart({ title, url });
          await updateBookmarkAction(bookmark.id, formData);
          onOpenChange(false);
        }} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              name="title"
              defaultValue={bookmark.title}
              placeholder="북마크 제목"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              name="url"
              defaultValue={bookmark.url}
              placeholder="https://example.com"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type='button' variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            {/*<Button type="submit" disabled={pending}>{p}</Button>*/}
            <SubmitButton/>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}