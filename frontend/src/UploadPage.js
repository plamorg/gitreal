import { useState } from "react";

function uploadImage(image) {
  const url = "localhost:8000/image/uploaddesktop/";
  fetch(url, {
    method: "POST",
    body: image,
    headers: {
      "content-type": image.type,
      "content-length": `${image.size}`,
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(`Successfully uploaded image: ${data}`))
    .catch((err) => console.error(err));
}

const UploadPage = () => {
  const [fileURL, setFileURL] = useState();
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFileURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <main class="flex flex-col h-screen mx-auto max-w-screen-md px-4">
        <input type="file" onChange={handleFileChange} />
        <img src={fileURL} />
        <a onClick={() => uploadImage(file)}>Upload</a>
      </main>
    </div>
  );
};

export default UploadPage;