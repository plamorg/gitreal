import { useState } from "react";
import {
  Flex,
  Container,
  Heading,
  Text,
  Button,
  Box,
  SimpleGrid,
  Icon,
  Stack,
  HStack,
  Center,
  Img,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FcCompactCamera, FcCollaboration, FcAdvance } from "react-icons/fc";

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

function SimpleThreeColumns() {
  return (
    <Box p={4} textAlign="justify">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcCompactCamera} w={10} h={10} />}
          title={"Daily Snapshots"}
          text={
            "Keep up with your friends! Once per day, gitReal will prompt you and your friends to upload a webcam selfie and a screenshot of your desktop – a real, unfiltered snapshot of your daily lives. "
          }
        />
        <Feature
          icon={<Icon as={FcAdvance} w={10} h={10} />}
          title={"Get on with your day"}
          text={
            "Interact with your friends for as long as you need. Once you’re done, you can simply put gitReal away, finish your work, and look forward to catching up again tomorrow!"
          }
        />
        <Feature
          icon={<Icon as={FcCollaboration} w={10} h={10} />}
          title={"Support your friends"}
          text={
            "Like photos and comment on their work! You can help your friends debug, solve maths problems, or even offer advice on the cover letter and curriculum vitae they’re writing to land the ideal tech internship!"
          }
        />
      </SimpleGrid>
    </Box>
  );
}

const SamplePost = ({ name, image }) => {
  const [liked, setLiked] = useState(false);
  return (
    <Box
      w="md"
      rounded={"sm"}
      my={14}
      mx={14}
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
          {name}
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
  );
};

const Home = () => {
  const navigate = useNavigate();
  return (
    <Flex
      h="100vh"
      bg={useColorModeValue("gray.50", "gray.800")}
      flexDir="column"
    >
      <Container minW="70vw" pt={"4vw"} textAlign="center">
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Get Real with{" "}
          <Text as={"span"} color={"blue.400"}>
            gitReal
          </Text>
        </Heading>
        <Text mt={8} color={"gray.700"} fontSize="2xl">
          Spend too much time on the computer? Here's your chance to{" "}
          <Text as="span" color="blue.400" fontWeight="black">
            git
          </Text>{" "}
          real!
        </Text>
        <Text mt={1} color="gray.700" fontSize="lg">
          Made for Hack@Brown 2023
        </Text>
        <Button
          colorScheme={"blue"}
          size={"lg"}
          mt={8}
          mb={20}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <SimpleThreeColumns />
        <Center px={4}>
          <SamplePost
            name={"John Doe"}
            image="https://libreddit.edwardwibowo.com/img/nx6w525loiu81.png"
          />
          <SamplePost
            name={"josiah_s_carberry"}
            image="https://libreddit.edwardwibowo.com/img/c6amj988bsp91.png"
          />
        </Center>
      </Container>
    </Flex>
  );
};

export default Home;
