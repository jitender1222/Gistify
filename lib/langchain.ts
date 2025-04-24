import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const fetchAndExtractPdfText = async (pdfUrl: string) => {
  const response = await fetch(pdfUrl);
  const blob = await response.blob();

  const arrayBuffer = await blob.arrayBuffer();
  const loader = new PDFLoader(new Blob([arrayBuffer]));
  const docs = await loader.load();
  console.log(
    "arrayBuffer",
    arrayBuffer,
    "docs",
    docs,
    "blob",
    blob,
    "response",
    response
  );

  // combine all the pdf pages

  return docs.map((doc) => doc.pageContent).join("\n");
};

export default fetchAndExtractPdfText;
