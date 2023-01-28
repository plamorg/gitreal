import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { BsHeartFill, BsHeart } from "react-icons/bs";

export default function UserFrame(props) {
  const [liked, setLiked] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(
      "http://localhost:8000/image/get?" +
        new URLSearchParams({ username: props.username })
    )
      .then((res) => res.blob())
      .then((blob) => setImage(URL.createObjectURL(blob)));
  }, []);
  console.log(image);
  return (
    <Center py={6}>
      <Box
        w="3xl"
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
      >
        <Box h={"200px"} borderBottom={"1px"} borderColor="black">
          <Img
            src={image}
            roundedTop={"sm"}
            objectFit="cover"
            h="full"
            w="full"
            alt={"Image"}
          />
        </Box>
        <HStack borderTop={"1px"} color="black" justifyContent="space-between">
          <Heading p={4} color={"black"} fontSize={"1xl"} noOfLines={1}>
            {props.username}
          </Heading>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            cursor="pointer"
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <BsHeartFill fill="red" fontSize={"24px"} />
            ) : (
              <BsHeart fontSize={"24px"} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}
