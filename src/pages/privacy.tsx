import React from "react";
import Link from "next/link";
const documentURL =
  "https://docs.google.com/document/d/15P4YdCH3SgPAZWbNVyCOzwiDGp0je1CU9_RakH1rayY/edit?usp=sharing";

const Terms = () => {
  return (
    <div>
      <iframe src={documentURL} width="100%" height="600px" />
    </div>
  );
};

export default Terms;
