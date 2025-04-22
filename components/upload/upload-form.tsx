"use client";

import UploadFormInput from "./upload-form-input";

const handleFormSubmit = () => {
  return <div>Handle Submit</div>;
};

const UploadForm = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleFormSubmit} />;
    </div>
  );
};

export default UploadForm;
