import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Box, Input, Button, Image } from "@chakra-ui/react";
import data from "./global";
import Webcam from "react-webcam";

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

function uploadWebcamImage(image) {
  console.log(image);
  const url = "http://localhost:8000/webcam/upload/";
  const formData = new FormData();
  formData.append("file", image);
  formData.append("username", data.username());
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => console.log(`Successfully uploaded image: ${data}`))
    .catch((err) => console.error(err));
}

function uploadImage(image) {
  const url = "http://localhost:8000/image/uploaddesktop/";
  const formData = new FormData();
  formData.append("file", image);
  formData.append("username", data.username());
  console.log(image);
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => console.log(`Successfully uploaded image: ${data}`))
    .catch((err) => console.error(err));
}

const UploadPage = () => {
  const webcamRef = useRef(null);
  const [webcamImage, setWebcamImage] = useState("test");
  const navigate = useNavigate();
  const [fileURL, setFileURL] = useState();
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
      setFileURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const capture = useCallback(() => {
    const image = webcamRef.current.getScreenshot();
    setWebcamImage(image);
    uploadWebcamImage(dataURLtoFile(image, "webcam.png"));
  }, [webcamRef, setWebcamImage]);

  return (
    <Center h="100vh">
      <Box>
        <Input
          placeholder="Upload"
          onChange={handleFileChange}
          type="file"
          mb={5}
        />
        <Center>
          {file ? (
            <Image w="64" h="64" src={fileURL} />
          ) : (
            <Box w="64" h="64" bg="gray"></Box>
          )}
        </Center>
        <Center mt={5}>
          <Webcam
            width="50%"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
          />
        </Center>
        <Button
          mt={5}
          onClick={() => {
            capture();
            uploadImage(file);
            navigate("/");
          }}
        >
          Upload
        </Button>
      </Box>
    </Center>
  );
};

export default UploadPage;
