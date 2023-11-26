//@ts-nocheck
import React, { useState } from "react";

const Audioform = () => {
  //const [blob, setBlob] = useState<FileWithBlob | null>(null);
  const [blob, setBlob] = useState();
  const [file, setFile] = useState();
  var blobData = {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form", blob);
    const xi_api_key = process.env.PAID_ELEVEN_API_KEY; // replace this with your API key
    const voice_name = "My Voice";
    const description = "This is my voice";
    const labels = "Accent";

    const formData = new FormData();
    if (blob && file) {
      //formData.append('file', blob);
      formData.append("file", blobData, file);
      console.log("form", formData);
    }

    const res = await fetch("/api/addVoice", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      console.log("Voice added successfully");
    } else {
      console.error("Failed to add voice", await res.json());
    }
  };

  // interface FileWithBlob extends File {
  //   blob(): Promise<Blob>;
  // }

  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

  //   //const file = e.target.files?.[0] as FileWithBlob;
  //   const selectedFile = e.target.files?.[0] as FileWithBlob;

  //   if(selectedFile) {
  //     console.log("file", selectedFile);
  //     // blo = await selectedFile.blob() as Blob;
  //     const blo = new Blob([selectedFile], {type: 'application/pdf'});
  //     setBlob(blo  as FileWithBlob);
  //     // console.log("blob", blo);

  //   }
  //   console.log("blob", blob);
  // }

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // convert to blob
      console.log("file", selectedFile);
      blobData = new Blob([selectedFile], { type: "application/pdf" });
      console.log("blob", blobData);
      //setBlob(prevFile => blobData);

      setFile(selectedFile);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Voice File:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Audioform;
