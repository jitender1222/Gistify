"use client";

import { useUploadThing } from "@/app/utils/uploadThing";
import UploadFormInput from "./upload-form-input";
import { toast } from "sonner";

import { z } from "zod";
import {
  generatePdfSummary,
  generatePdfText,
  storePDFSummary,
} from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { formatFileNameAsTitle } from "@/lib/formattedFileName";

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
  const router = useRouter();
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
    onUploadBegin: (data) => {
      console.log("upload has begun for", data);
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

      const uploadResponse = await startUpload([file]);
      // console.log("resp", uploadResponse);

      if (!uploadResponse) {
        toast.error("Something went wrong", {
          description: "Please use a different file",
        });
        setLoading(false);
        return;
      }

      await toast.message("📄 Processing PDF ✅", {
        description: "Hang tight! Our AI is reading through your document!✨",
      });

      // AI code starts

      const uploadFileUrl = uploadResponse[0].serverData.fileUrl;

      let storeResult: any;
      toast.message("📄 Saving PDF ✅", {
        description: "Hang tight! we are saving your summary✨",
      });

      // console.log("data", data);
      // call AI Service
      const formattedFileName = formatFileNameAsTitle(file.name);
      const result = await generatePdfText({
        fileUrl: uploadFileUrl,
      });

      toast.message("📄 Generating PDF Summary ✅", {
        description: "Hang tight! Our AI is reading through your document!✨",
      });

      const summaryResult = await generatePdfSummary({
        pdfText: result.data?.pdfText ?? "",
        fileName: formattedFileName,
      });

      toast.message("📄 Saving PDF Summary ✅", {
        description: "Hang tight! Our AI is reading through your document!✨",
      });
      const { data = null, message = null } = summaryResult || {};

      if (data?.summary) {
        storeResult = await storePDFSummary({
          summary: data.summary,
          fileUrl: uploadFileUrl,
          title: formattedFileName,
          fileName: file.name,
        });

        toast.message("Summary Generated", {
          description:
            "🥳 Your PDF Summary has been summarized and saved successfully",
        });

        formRef.current?.reset();
        router.push(`/summaries/${storeResult.data.id}`);
        setLoading(false);
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
