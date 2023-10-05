import {
  Avatar,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deleteNotif, joinRoom, logout, readNotif } from "../axios/axios";
import { useLoaderData } from "react-router-dom";
import { BellIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { loading, user } = useLoaderData();
  const [isLoggedin, setIsLoggedin] = useState(false);
  let lgnbtn;
  useEffect(() => {
    if (!loading && user) {
      setIsLoggedin(true);
      user.notifs.map((notif) => {
        if (!notif.seen) {
          setNotif(true);
        }
      });
    }
  }, [user, loading]);
  const [notif, setNotif] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!loading && user && isLoggedin) {
    lgnbtn = (
      <>
        <Button
          onClick={async () => {
            onOpen();
            setNotif(false);
            await readNotif();
          }}
        >
          <BellIcon fontSize={"2xl"} color={notif ? "red.400" : "yellow.900"} />
        </Button>
        <Modal
          isCentered
          motionPreset="scale"
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Notifications</ModalHeader>
            <ModalBody>
              {!loading && user && user.notifs.length !== 0 ? (
                user.notifs.map((notif, id) => {
                  return (
                    <Flex
                      key={id}
                      p={2}
                      bgColor={"lightgray"}
                      borderRadius={10}
                      mb={4}
                      justify={"space-between"}
                      align={"center"}
                    >
                      {notif.message}
                      <Button mr={4} onClick={async () => {
                        const res = await joinRoom(notif.room);
                        if(res.errors){
                          console.log(res.errors);
                        }
                        else {
                          await deleteNotif(notif._id);
                          window.location.href = `/room/${notif.room}`;
                        }
                      }}>
                        <CheckIcon color={"green.400"} />
                      </Button>
                      <Button
                        onClick={async () => {
                          await deleteNotif(notif._id);
                        }}
                      >
                        <DeleteIcon color={"red.400"} />
                      </Button>
                    </Flex>
                  );
                })
              ) : (
                <div>No Notifications</div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Menu isLazy>
          <MenuButton px={4} py={2} transition="fade 0.4s">
            <Avatar name={user.name} />
          </MenuButton>
          <MenuList>
            <Link href="/profile">
              <MenuItem>Profile</MenuItem>
            </Link>
            <MenuDivider />
            <MenuItem
              onClick={async () => {
                const lt = await logout();
                console.log(lt);
                setIsLoggedin(false);
                // window.location.reload();
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  } else {
    lgnbtn = (
      <a href="/login">
        <Button p={"0 40px"} mr={4} borderRadius={"3xl"}>
          Login
        </Button>
      </a>
    );
  }

  return (
    <Flex boxShadow={"lg"} bgColor={"gray.100"} w="100%" h={20} mb={8}>
      <Flex
        flex={1}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={4}
      >
        <Flex flex={0.2}></Flex>
        <Flex flex={0.4}></Flex>
        <Flex flex={0.4} justifyContent={"flex-end"} alignItems={"center"}>
          {lgnbtn}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
