import { GridItem, Flex, Image } from "@chakra-ui/react";

const Resource = ({ name, url }) => {
  return (
    <GridItem>
      <Flex
        as={"a"}
        href={url}
        _hover={{ boxShadow: "2xl" }}
        h={"300px"}
        p={4}
        border={"1px solid lightgrey"}
        borderRadius={10}
        flexDir={"column"}
      >
        <Image
          src={url.slice(0, url.length - 3) + "jpg"}
          h={"200px"}
          w={"300px"}
        />
        <Flex>{name.replaceAll("%20", " ")}</Flex>
      </Flex>
    </GridItem>
  );
};

export default Resource;
