import { useState } from "react";

const UploadPage = () => {
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <main class="flex flex-col h-screen mx-auto max-w-screen-md px-4">
        <input type="file" onChange={handleFileChange} />
        <img src={file} />
        <a>Upload</a>
      </main>
    </div>
  );
};

export default UploadPage;
