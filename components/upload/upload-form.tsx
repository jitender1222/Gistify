"use client";

import { useUploadThing } from "@/app/utils/uploadThing";
import UploadFormInput from "./upload-form-input";
import { toast } from "sonner";

import { z } from "zod";
import { generatePdfSummary } from "@/actions/upload-actions";
import { useRef, useState } from "react";

const fileUploadSchema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File must be less then 20MB",
    })
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a pdf"
    ),
});

const UploadForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("Uploaded successfully", {
        description: "Whooo 🥳 Pdf file uploaded successfully",
      });
    },
    onUploadError: (err) => {
      console.log("error occurred while uploading", err);
      toast.message("Error occured while uploading", {
        description: err.message,
      });
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Submitted");
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;
      const isValidated = fileUploadSchema.safeParse({ file });

      if (!isValidated.success) {
        toast.error("❌ something went wrong", {
          description:
            isValidated.error.flatten().fieldErrors.file?.[0] ??
            "Invalid error",
        });
        setLoading(false);
        return;
      }

      toast.message("📄 uploading pdf...", {
        description: "We are uploading your pdf",
      });

      const resp = await startUpload([file]);

      if (!resp) {
        toast.error("Something went wrong", {
          description: "Please use a different file",
        });
        setLoading(false);
        return;
      }

      toast.message("📄 pdf uploaded successfully ✅", {
        description: "Hang tight! Our AI is reading through your document!✨",
      });

      const result = await generatePdfSummary(resp);
      console.log({ result });

      const { data = null, message = null } = result || {};

      if (data) {
        toast.message("📄 Saving PDF ✅", {
          description: "Hang tight! we are saving your summary✨",
        });
        formRef.current?.reset();
        // if(data.summary){

        // }
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      formRef.current?.reset();
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={loading}
        formRef={formRef}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default UploadForm;
