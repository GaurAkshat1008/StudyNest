import { Flex, GridItem } from "@chakra-ui/react";
import PropTypes from "prop-types";

const RoomCard = ({ name, admin, id }) => {
  return (
    <GridItem>
      <Flex
        as={"a"}
        href={`/room/${id}`}
        _hover={{ boxShadow: "2xl" }}
        h={"300px"}
        p={4}
        border={"1px solid lightgrey"}
        borderRadius={10}
        flexDir={'column'}
      >
        <Flex flex={0.3}>{name.slice(0, name.length-36)}</Flex>
        <Flex flex={0.7}>{admin}</Flex>
      </Flex>
    </GridItem>
  );
};

RoomCard.propTypes = {
  name: PropTypes.string.isRequired,
  admin: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RoomCard;
