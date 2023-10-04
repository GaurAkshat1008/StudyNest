import {
  Button,
  Flex,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useAuth } from "../utils/useAuth";
import { StarIcon } from "@chakra-ui/icons";

const Participant = ({ user, room }) => {
  const { loading, user: us } = useAuth();
  const isAdmin = room.admin.includes(user._id);
  return (
    <GridItem display={"flex"} justifyContent={"center"}>
      <Flex
        w={"80vw"}
        bgColor={"gray.100"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={4}
        h={12}
        borderRadius={10}
      >
        <Flex alignItems={"center"} justify={"space-between"} flex={0.1}>
          {user.name} ({user.username}){isAdmin && <StarIcon />}
        </Flex>
        <Flex flex={0.5}>
          {!loading && us._id !== user._id && isAdmin && (
            <Menu>
              <MenuButton as={Button}>&#65049;</MenuButton>
              <MenuList>
                <MenuItem>Make Admin</MenuItem>
                <MenuItem color={"red.700"}>Remove</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </GridItem>
  );
};

Participant.propTypes = {
  user: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
};

export default Participant;
