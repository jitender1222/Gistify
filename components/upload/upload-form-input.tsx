"use client";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface UploadFormInputs {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formRef: React.Ref<HTMLFormElement>;
  isLoading: boolean;
}

const UploadFormInput = ({
  isLoading,
  onSubmit,
  formRef,
}: UploadFormInputs) => {
  return (
    <form ref={formRef} className="flex flex-col gap-6 " onSubmit={onSubmit}>
      <div className="flex gap-2 items-center">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          disabled={isLoading}
          className={cn(isLoading && "opacity-50 cursor-not-allowed")}
        />
        <Button disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing ....
            </>
          ) : (
            "Upload your PDF"
          )}{" "}
        </Button>
      </div>
    </form>
  );
};

export default UploadFormInput;
