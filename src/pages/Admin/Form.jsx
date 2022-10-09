import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
  FormControl,
  FormLabel,
  Textarea,
  Text,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import JoditEditor from "jodit-react";
import { api } from "../../api";

export default function Admin() {
  const editor = useRef(null);
  const navigate = useNavigate();
  const format = (val) => val;
  const parse = (val) => val.replace(/^\$/, "");

  const isLogin = localStorage.getItem("isLogin");

  const [img, setImg] = useState();
  const [title, setTitle] = useState();
  const [type, setType] = useState();
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState();
  const [duration, setDuration] = useState({
    day: 1,
    night: 0
  });
  const [selectedFile, setSelectedFile] = useState();
  const [loading, setLoading] = useState(false);

  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const create = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "dfasplbkw");
      const upload = await axios({
        method: "POST",
        data,
        url: "https://api.cloudinary.com/v1_1/dfasplbkw/image/upload",
      });
      await axios({
        method: "POST",
        data: {
          imgTitle: upload.data.url,
          title,
          type,
          price,
          desc,
        },
        url: `${api}/posts/create`,
      });
      window.location.href = "/list";
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const update = async () => {
    setLoading(true);
    try {
      if (selectedFile) {
        const data = new FormData();
        data.append("file", selectedFile);
        data.append("upload_preset", "chatApp");
        data.append("cloud_name", "dfasplbkw");
        const upload = await axios({
          method: "POST",
          data,
          url: "https://api.cloudinary.com/v1_1/dfasplbkw/image/upload",
        });
        await axios({
          method: "PATCH",
          data: {
            imgTitle: upload.data.url,
            title,
            type,
            price,
            desc,
            duration,
          },
          url: `${api}/posts/update/${param}`,
        });
        window.location.href = "/list";
      } else {
        await axios({
          method: "PATCH",
          data: {
            imgTitle: img,
            title,
            type,
            price,
            desc,
            duration,
          },
          url: `${api}/posts/update/${param}`,
        });
        window.location.href = "/list";
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const param =
    window.location.href.split("/")[window.location.href.split("/").length - 1];

  const fetchData = async () => {
    if (param != 0) {
      try {
        const result = await axios({
          method: "GET",
          url: `${api}/posts/${param}`,
        });
        setImg(result.data?.imgTitle);
        setDesc(result.data?.desc);
        setTitle(result.data?.title);
        setType(result.data?.type);
        setPrice(result.data?.price);
        setDuration(result.data?.duration);
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [param]);

  useEffect(() => {
    if(duration?.day && title) {
      const splitTitle = title.split("(")[0];
      const titleReplace = `${splitTitle}` + `(${duration.day}D - ${duration.night}N)`;
      setTitle(titleReplace);
    }
  }, [duration?.day, duration?.night, title]);

  if (!isLogin) {
    return <Box>404</Box>;
  }
  return (
    <>
      <Box bg={"#a7c6d9"} px={4} fontSize="200%">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Vietnamjoytravel</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  {/* <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br /> */}
                  <Center>
                    <p>admin</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={logOut}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Stack spacing={3} margin={"16px"}>
        <FormControl>
          <FormLabel fontSize={"200%"}>Title:</FormLabel>
          <Textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            size="lg"
            fontSize={"200%"}
          />
          {!title && (
            <Text fontSize="200%" color="red">
              Title is required
            </Text>
          )}
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"200%"}>Location:</FormLabel>
          <Textarea
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Type"
            size="lg"
            fontSize={"200%"}
          />
          {!type && (
            <Text fontSize="200%" color="red">
              Location is required
            </Text>
          )}
        </FormControl>
        <FormControl w="20%">
          <FormLabel fontSize={"200%"}>Day:</FormLabel>
          <NumberInput
            value={format(duration?.day)}
            min={1}
            max={30}
            onChange={(valueString) =>
              setDuration({ ...duration, day: parse(valueString) })
            }
          >
            <NumberInputField fontSize={"200%"} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl w="20%">
          <FormLabel fontSize={"200%"}>Night:</FormLabel>
          <NumberInput
            value={format(duration?.night)}
            min={0}
            max={30}
            onChange={(valueString) =>
              setDuration({ ...duration, night: parse(valueString) })
            }
          >
            <NumberInputField fontSize={"200%"} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"200%"}>Price:</FormLabel>
          <Textarea
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            size="lg"
            fontSize={"200%"}
          />
          {!price && (
            <Text fontSize="200%" color="red">
              Title is required
            </Text>
          )}
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"200%"}>Description:</FormLabel>
          <JoditEditor
            ref={editor}
            value={desc}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setDesc(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
        </FormControl>
        <Text fontSize={"200%"}>Image Title:</Text>
        <Flex>
          <Button
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.files[0])}
            colorScheme="teal"
            w={"20%"}
          >
            <input type="file" style={{ width: "100%" }} />
          </Button>

          <Button
            leftIcon={<DeleteIcon />}
            colorScheme="red"
            variant="solid"
            onClick={() => setSelectedFile()}
          />
        </Flex>

        {img ? (
          <Image
            src={selectedFile ? URL.createObjectURL(selectedFile) : img}
            alt=""
            boxSize="70%"
            objectFit="cover"
          />
        ) : (
          <Image
            src={selectedFile ? URL.createObjectURL(selectedFile) : img}
            alt=""
            boxSize="70%"
            objectFit="cover"
          />
        )}

        <Stack direction="row" spacing={4} justifyContent="center">
          {param == 0 ? (
            <Button
              isLoading={loading}
              loadingText="Submitting"
              colorScheme="teal"
              variant="outline"
              onClick={create}
              width={"20%"}
              fontSize="150%"
              height="50px"
            >
              Create
            </Button>
          ) : (
            <Button
              isLoading={loading}
              loadingText="Submitting"
              colorScheme="teal"
              variant="outline"
              onClick={update}
              width={"10%"}
              fontSize="150%"
              height="50px"
            >
              Update
            </Button>
          )}

          <Button
            isLoading={loading}
            fontSize="150%"
            width={"20%"}
            height="50px"
            colorScheme="teal"
            variant="solid"
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
