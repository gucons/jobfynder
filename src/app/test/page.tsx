"use client";

import { UploadButton } from "@/lib/uploadThingComponent";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <div className="flex h-svh w-svw items-center justify-center">
      <UploadButton
        endpoint="consultantCertifications"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}

export default page;
