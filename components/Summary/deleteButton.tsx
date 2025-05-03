"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { deleteSummary } from "@/actions/summary-actions";
import { toast } from "sonner";

interface DeleteButtonProps {
  summaryId: string;
}

const DeleteButton = ({ summaryId }: DeleteButtonProps) => {
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    const response = await deleteSummary({ summaryId });
    if (!response.success) {
      toast.error("Error", {
        description: "Failed to delete the summary",
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-gray-400 bg-gray-50 border
     border-gray-200
      hover:text-rose-800
       hover:bg-rose-500"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this summary ? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            variant={"ghost"}
            className="text-gray-600 bg-gray-200 border
     border-gray-200
      hover:text-gray-900
       hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant={"destructive"}
            className="bg-gray-900 
      hover:bg-gray-600
       "
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
