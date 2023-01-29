import { useState, useEffect, useLayoutEffect } from "react";
import {
  Box,
  Heading,
  Img,
  Flex,
  Center,
  useColorModeValue,
  Text,
  HStack,
} from "@chakra-ui/react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import data from "./global";

export default function UserFrame(props) {
  const [liked, setLiked] = useState(false);
  const [image, setImage] = useState(null);
  const [amt, setAmt] = useState(0);

  useEffect(() => {
    fetch(
      "http://localhost:8000/image/get?" +
        new URLSearchParams({ username: props.username })
    )
      .then((res) => res.blob())
      .then((blob) => setImage(URL.createObjectURL(blob)));
  }, []);

  useEffect(() => {
    fetch(
      "http://localhost:8000/likes?" +
        new URLSearchParams({ username: props.username })
    )
      .then((res) => res.json())
      .then((json) => {
        if (!!json.likes) {
          setAmt(json.likes);
        }
      });
  });

  return (
    <Center py={6}>
      <Box
        w="3xl"
        rounded={"sm"}
        my={1}
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
            onClick={() => {
              setLiked(!liked);
              if (liked === false) {
                const content = {
                  targetuser: props.username,
                  sourceuser: data.username(),
                };
                console.log(content);
                fetch("http://localhost:8000/like?", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(content),
                })
                  .then((res) => res.json())
                  .then((json) => {
                    console.log(json);
                    if (json.likes !== null && json.likes !== undefined) {
                      console.log("updating 2");
                      setAmt(json.likes);
                    }
                  })
                  .catch((err) => console.error(err));
              } else {
                const content = {
                  targetuser: props.username,
                  sourceuser: data.username(),
                };
                console.log(content);
                fetch("http://localhost:8000/unlike?", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(content),
                })
                  .then((res) => res.json())
                  .then((json) => {
                    console.log(json);
                    if (json.likes !== null && json.likes !== undefined) {
                      console.log("updating");
                      setAmt(json.likes);
                    }
                  })
                  .catch((err) => console.error(err));
              }
            }}
          >
            <HStack>
              <Text>{amt}</Text>
              {liked ? (
                <BsHeartFill fill="red" fontSize={"24px"} />
              ) : (
                <BsHeart fontSize={"24px"} />
              )}
            </HStack>
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}
