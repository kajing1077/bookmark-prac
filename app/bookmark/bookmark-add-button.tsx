"use client";

import { CirclePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";
import { useState } from "react";
import { createBookmarkAction } from "@/app/actions/bookmark";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="disabled:opacity-50">
      {pending ? "저장 중..." : "저장"}
    </Button>
  );
}

export default function AddButton() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsAddDialogOpen(true)}
        className=" flex cursor-pointer gap-2 p-4 text-slate-950 bg-indigo-200 text-sm w-fit opacity-75 rounded-xl items-center hover:opacity-100 hover:shadow-md"
      >
        <CirclePlus />
        북마크 추가
      </button>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>북마크 추가</DialogTitle>
          </DialogHeader>

          <Form
            action={async (formData) => {
              await createBookmarkAction(formData);
              setIsAddDialogOpen(false);
            }}
            className="space-y-4"
          >
            <input type="hidden" name="_action" value="create" />

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                type="url"
                required
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">이름</Label>
              <Input
                id="title"
                name="title"
                type="text"
                required
                placeholder="북마크 제목"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                취소
              </Button>
              <SubmitButton />
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
