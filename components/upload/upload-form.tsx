"use client";

import { useUploadThing } from "@/app/utils/uploadThing";
import UploadFormInput from "./upload-form-input";
import { toast } from "sonner";

import { z } from "zod";
import { generatePdfSummary, storePDFSummary } from "@/actions/upload-actions";
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
    onUploadBegin: ({ file }: any) => {
      console.log("upload has begun for", file);
    },
  });
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
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

      await toast.message("📄 uploading pdf...", {
        description: "We are uploading your pdf",
      });

      const resp = await startUpload([file]);
      console.log("resp", resp);

      if (!resp) {
        toast.error("Something went wrong", {
          description: "Please use a different file",
        });
        setLoading(false);
        return;
      }

      await toast.message("📄 pdf uploaded successfully ✅", {
        description: "Hang tight! Our AI is reading through your document!✨",
      });

      // AI code starts

      const result = await generatePdfSummary(resp);
      console.log("result", { result });

      const { data = null, message = null } = result || {};

      if (data) {
        toast.message("📄 Saving PDF ✅", {
          description: "Hang tight! we are saving your summary✨",
        });

        console.log("data", data);

        if (data.summary) {
          await storePDFSummary({
            summary: data.summary,
            fileUrl: resp[0].serverData.file.url,
            title: data.title,
            fileName: resp[0].serverData.file.name,
          });
          toast.message("Summary Generated", {
            description:
              "🥳 Your PDF Summary has been summarized and saved successfully",
          });

          formRef.current?.reset();
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error("Error while saving the file");
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
