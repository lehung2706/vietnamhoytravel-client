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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { api } from '../../api';
import "./List.css";
import { DeleteIcon } from "@chakra-ui/icons";

export default function Admin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLogin = localStorage.getItem("isLogin");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();

  const getData = async () => {
    try {
      const data = await axios({
        method: "POST",
        url: `${api}/posts`,
      });
      setList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const goToDetail = (e, id) => {
    e.preventDefault();
    window.location.href = `/form/${id}`;
  };

  useEffect(() => {
    getData();
  }, []);

  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      const data = await axios({
        method: "PATCH",
        url: `${api}/posts/delete/${id}`,
      });
      await getData();
      closeLoginForm();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const openLoginForm = (e, id) => {
    e.preventDefault();
    setId(id);
    document.querySelector(".login-form-container").classList.add("active");
  };
  const closeLoginForm = () => {
    document.querySelector(".login-form-container").classList.remove("active");
  };

  if (!isLogin) {
    return <Box>404</Box>;
  }
  return (
    <>
      <Box bg={"#a7c6d9"} px={4} style={{ fontSize: "150%" }}>
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
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>admin</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={() => (window.location.href = "/form/0")}>
                    New tour
                  </MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={logOut}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Box fontSize={"150%"} margin={"16px"}>
        <TableContainer whiteSpace={"wrap"}>
          <Table variant="simple">
            <TableCaption fontSize={"150%"}>
              {list.length > 1 ? (
                <>Found {list.length} documents</>
              ) : (
                <>Found {list.length} document</>
              )}
            </TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={"150%"}>Title</Th>
                <Th fontSize={"150%"}>Type</Th>
                <Th fontSize={"150%"} isNumeric>
                  Price
                </Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {list.map((line, i) => (
                <Tr className="line">
                  <Td className="title" lineHeight={"3.9rem"}>
                    {line.title}
                  </Td>
                  <Td fontSize={"150%"} onClick={(e)=> goToDetail(e, line._id)}>{line.type}</Td>
                  <Td isNumeric fontSize={"150%"}>
                    {line.price}
                  </Td>
                  <Td>
                    <Button
                      w="4.5rem"
                      h="3rem"
                      leftIcon={<DeleteIcon />}
                      colorScheme="red"
                      variant="solid"
                      fontSize="2rem"
                      onClick={(e) => openLoginForm(e, line._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
      </Box>
      <Box className="login-form-container">
        <Box className="form">
          <i
            className="fas fa-times"
            id="form-close"
            onClick={() => closeLoginForm()}
          ></i>
          <form>
            <h3>Confirm</h3>
            <h3>Are you sure?</h3>
            <Button
              colorScheme="gray"
              w="20%"
              h="4rem"
              fontSize="2rem"
              onClick={() => closeLoginForm()}
              isLoading={loading}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              w="20%"
              h="4rem"
              marginLeft="1rem"
              fontSize="2rem"
              onClick={() => onDelete()}
              isLoading={loading}
            >
              Delete
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}
