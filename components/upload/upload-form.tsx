"use client";

import { useUploadThing } from "@/app/utils/uploadThing";
import UploadFormInput from "./upload-form-input";
import { toast } from "sonner";

import { z } from "zod";
import { generatePdfSummary } from "@/actions/upload-actions";

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
    console.log("Submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    const isValidated = fileUploadSchema.safeParse({ file });

    if (!isValidated.success) {
      toast.error("❌ something went wrong", {
        description:
          isValidated.error.flatten().fieldErrors.file?.[0] ?? "Invalid error",
      });
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
      return;
    }

    toast.message("📄 pdf uploaded successfully ✅", {
      description: "Hang tight! Our AI is reading through your document!✨",
    });

    const summary = await generatePdfSummary(resp);
    // console.log("respo", resp);
    // console.log("summa", summary);
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleFormSubmit} />
    </div>
  );
};

export default UploadForm;
