import { useState } from "react";
import { Center, Box, Input, Button, Image } from "@chakra-ui/react";

function uploadImage(image) {
  const url = "http://localhost:8000/image/uploaddesktop/";
  const formData = new FormData();
  formData.append("file", image);
  formData.append("username", "enterusernamehere");
  fetch(url, {
    method: "POST",
    body: formData,
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
        <Button mt={5} onClick={() => uploadImage(file)}>
          Upload
        </Button>
      </Box>
    </Center>
  );
};

export default UploadPage;
