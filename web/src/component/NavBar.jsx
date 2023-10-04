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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { logout } from "../axios/axios";
import { useLoaderData } from "react-router-dom";

const Navbar = () => {
  const { loading, user } = useLoaderData();
  const [isLoggedin, setIsLoggedin] = useState(false);
  let lgnbtn;
  useEffect(() => {
    if (!loading && user) {
      setIsLoggedin(true);
    }
  }, [user, loading]);

  if (!loading && user && isLoggedin) {
    lgnbtn = (
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
        <Flex flex={0.4}>
          
        </Flex>
        <Flex flex={0.4} justifyContent={"flex-end"} alignItems={"center"}>
          {lgnbtn}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
