"use client";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

interface UploadFormInputs {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadFormInput = ({ onSubmit }: UploadFormInputs) => {
  return (
    <form className="flex flex-col gap-6 " onSubmit={onSubmit}>
      <div className="flex gap-2 items-center">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          className=""
        />
        <Button>Upload your PDF</Button>
      </div>
    </form>
  );
};

export default UploadFormInput;
