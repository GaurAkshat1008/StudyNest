import { Flex, GridItem, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { findUserById } from "../axios/axios";
import { useState, useEffect } from "react";

const RoomCard = ({ room }) => {
  const [admin, setAdmin] = useState("");
  const fetchAdmin = async () => {
    const user = await findUserById(room.admin[0]);
    setAdmin(user.user.username);
  };

  useEffect(() => {
    fetchAdmin();
  }, [admin])

  return (
    <GridItem>
      <Flex
        as={"a"}
        href={`/room/${room._id}`}
        _hover={{ boxShadow: "2xl" }}
        h={"300px"}
        p={4}
        border={"1px solid lightgrey"}
        borderRadius={10}
        flexDir={"column"}
      >
        <Flex flex={0.7}>
          <Image src={`/images/ci${room.img}.png`} />
        </Flex>
        <Flex flex={0.3} fontSize={"2xl"} fontWeight={"bold"}>
          {room.name.slice(0, name.length - 36)}
        </Flex>
        <Flex> Created by: {admin} </Flex>
      </Flex>
    </GridItem>
  );
};

RoomCard.propTypes = {
  room: PropTypes.object.isRequired,
};

export default RoomCard;
