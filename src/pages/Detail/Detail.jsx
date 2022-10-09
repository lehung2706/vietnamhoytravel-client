import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import axios from "axios";
import { api } from "../../api"
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  useMediaQuery,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  useToast,
  Flex,
  Center,
  Image,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

export default function Detail() {
  const toast = useToast({
    containerStyle: {
      width: "600px",
      fontSize: "2rem",
      maxWidth: "100%",
    },
  });
  const [isLessThan480] = useMediaQuery("(max-width: 480px)");
  const [isLessThan1530] = useMediaQuery("(max-width: 1530px)");
  const [isLessThan1000] = useMediaQuery("(max-width: 1000px)");
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [img, setImg] = useState();
  const [title, setTitle] = useState();
  const [type, setType] = useState();
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState();
  const [duration, setDuration] = useState();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [emailData, setEmailData] = useState({
    name: "",
    subject: "",
    phoneNumber: "",
    email: "",
    nog: "",
    package: "",
    time: "",
  });

  const [errorName, setErrorName] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorNog, setErrorNog] = useState(false);

  const validate = () => {
    if (!emailData.name) setErrorName(true);
    else setErrorName(false);

    if (!emailData.phoneNumber) setErrorPhoneNumber(true);
    else setErrorPhoneNumber(false);

    if (!emailData.email) setErrorEmail(true);
    else setErrorEmail(false);

    if (!emailData.nog) setErrorNog(true);
    else setErrorNog(false);

    if (errorEmail && errorName && errorPhoneNumber && errorNog) return true;
    return false;
  };

  const param =
    window.location.href.split("/")[window.location.href.split("/").length - 1];

  const fetchData = async () => {
    try {
      const result = await axios({
        method: "GET",
        url: `${api}/posts/detail/${param}`,
      });
      setImg(result.data.imgTitle);
      setDesc(result.data.desc);
      setTitle(result.data.title);
      setType(result.data.type);
      setPrice(result.data.price);
      setDuration(result.data.duration);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [param]);

  const sendEmail = async () => {
    const check = validate();
    if (check) {
      setLoading(true);
      try {
        const time =
          state[0].startDate.toLocaleDateString() +
          "--" +
          state[0].endDate.toLocaleDateString();
        const sendEmail = await axios({
          method: "POST",
          data: {
            ...emailData,
            time,
            package: title,
            subject: `Mr/Mrs ${emailData.name} book tour ${title} - $${price} for ${emailData.nog} people at ${time}`,
          },
          url: `${api}/email`,
        });
        toast({
          position: "top",
          title: "SENT",
          description: "We will reply as soon as possible",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  const createDesc = () => {
    return { __html: desc };
  };
  return (
    <>
      <Header title={title} desc1={title} desc2={type} marginBottom="1rem" page='detail'/>
      <Box w="80%" margin="auto">
        <Box
          h="15rem"
          display="flex"
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          bg="white"
        >
          <Text fontSize={isLessThan480 ? "4xl" : "6xl"} alignSelf="flex-end">
            {title} -{" "}
            {isLessThan480 ? (
              <span style={{ color: "red", fontSize: "2rem" }}>${price}</span>
            ) : (
              <span style={{ color: "red", fontSize: "3.5rem" }}>${price}</span>
            )}
          </Text>
        </Box>
        <Tabs
          isManual
          variant="enclosed"
          fontSize="150%"
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          bg="white"
          marginTop="1.5rem"
          marginBottom="1.5rem"
          flex="0.9"
        >
          <TabList>
            <Tab fontSize="150%">DETAILS</Tab>
            <Tab fontSize="150%">PHOTOS</Tab>
          </TabList>
          <TabPanels fontSize="150%">
            <TabPanel>
              <Flex>
                <Center
                  flex="0.5"
                  h="10rem"
                  boxShadow="dark-lg"
                  p="6"
                  rounded="md"
                  bg="white"
                >
                  <i className="fas fa-map-marker-alt"></i>&nbsp;
                  {type}
                </Center>
                <Center
                  flex="0.5"
                  h="10rem"
                  boxShadow="dark-lg"
                  p="6"
                  rounded="md"
                  bg="white"
                >
                  <TimeIcon /> &nbsp;
                  {duration?.day} {duration?.day > 1 ? "days" : "day"} -{" "}
                  {duration?.night} {duration?.night > 1 ? "nights" : "night"}
                </Center>
              </Flex>
              <Box dangerouslySetInnerHTML={createDesc()} mt="2rem"></Box>
            </TabPanel>
            <TabPanel>
              <Center>
                <Image
                  boxSize="80%"
                  objectFit="cover"
                  src={img}
                  alt="imgTitle"
                ></Image>
              </Center>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Button
        pos="fixed"
        right="0"
        h="5rem"
        top="10%"
        fontSize="2rem"
        colorScheme="red"
        variant="solid"
        onClick={onOpen}
      >
        BOOK NOW
      </Button>
      <Drawer placement="top" onClose={onClose} isOpen={isOpen} size="xl">
        <DrawerOverlay />
        <DrawerContent textAlign="center">
          {/* <DrawerHeader borderBottomWidth='1px' bg='white' >Basic Drawer</DrawerHeader> */}
          <DrawerBody
            w={isLessThan1000 ? "100%" : isLessThan1530 ? "80%" : "60%"}
            margin="auto"
          >
            <Text fontSize="6xl">BOOK</Text>
            <FormControl>
              <FormLabel fontSize="200%">Email address</FormLabel>
              <Input
                type="email"
                fontSize="200%"
                onChange={(e) =>
                  setEmailData({ ...emailData, email: e.target.value })
                }
              />
              {errorEmail && (
                <Text fontSize="200%" color="red">
                  Email is required
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel fontSize="200%">Phone Number</FormLabel>
              <Input
                fontSize="200%"
                type="number"
                onChange={(e) =>
                  setEmailData({ ...emailData, phoneNumber: e.target.value })
                }
              />
              {errorPhoneNumber && (
                <Text fontSize="200%" color="red">
                  Phone Number is required
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel fontSize="200%">Name</FormLabel>
              <Input
                fontSize="200%"
                type="text"
                onChange={(e) =>
                  setEmailData({ ...emailData, name: e.target.value })
                }
              />
              {errorName && (
                <Text fontSize="200%" color="red">
                  Name is required
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel fontSize="200%">Number of guests</FormLabel>
              <Input
                type="number"
                fontSize="200%"
                onChange={(e) =>
                  setEmailData({ ...emailData, nog: e.target.value })
                }
              />
              {errorNog && (
                <Text fontSize="200%" color="red">
                  Number of Guests is required
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel fontSize="200%">Package</FormLabel>
              <Input type="text" value={title} fontSize="200%" readOnly />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="200%">Time</FormLabel>
              <DateRangePicker
                onChange={(item) => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                direction="horizontal"
              />
            </FormControl>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px" margin="auto">
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
              h="5rem"
              fontSize="2rem"
              isLoading={loading}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              h="5rem"
              fontSize="2rem"
              isLoading={loading}
              onClick={() => sendEmail()}
            >
              Send Email
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Footer />
    </>
  );
}
