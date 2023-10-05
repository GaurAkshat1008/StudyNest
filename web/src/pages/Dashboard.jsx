import { Box, Button, Flex, Grid, GridItem, Skeleton, Stack } from "@chakra-ui/react";
import { loadRooms } from "../axios/axios";
import { useEffect, useState } from "react";
import RoomCard from "../component/RoomCard";
import { useLoaderData } from "react-router-dom";

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {loading:ld, user} = useLoaderData();
  console.log(user)
  if(!ld && !user){
    window.location.href = '/login'
  }
  let body = null;
  const getRooms = async () => {
    const data = await loadRooms();
    if (data.errors) {
      setError(true);
      setLoading(false);
    } else {
      setRooms(data.rooms);
      setLoading(false);
    }
  };
  useEffect(() => {
    getRooms();
  }, []);
  console.log(rooms);
  if (loading) {
    body = (
      <Grid
        ml={"auto"}
        mr={"auto"}
        gap={4}
        w={"90%"}
        listStyleType="none"
        templateColumns={"repeat(auto-fit, minmax(300px, 0.25fr))"}
      >
        <GridItem>
          <Flex
            as={"a"}
            href="/"
            _hover={{ boxShadow: "2xl" }}
            h={"300px"}
            p={4}
            border={"1px solid lightgrey"}
            borderRadius={10}
            flexDir={"column"}
          >
            <Stack>
              <Skeleton h={"20px"} />
              <Skeleton h={"20px"} />
              <Skeleton h={"20px"} />
            </Stack>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex
            as={"a"}
            href="/"
            _hover={{ boxShadow: "2xl" }}
            h={"300px"}
            p={4}
            border={"1px solid lightgrey"}
            borderRadius={10}
            flexDir={"column"}
          >
            <Stack>
              <Skeleton h={"20px"} />
              <Skeleton h={"20px"} />
              <Skeleton h={"20px"} />
            </Stack>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex
            as={"a"}
            href="/"
            _hover={{ boxShadow: "2xl" }}
            h={"300px"}
            p={4}
            border={"1px solid lightgrey"}
            borderRadius={10}
            flexDir={"column"}
          >
            <Stack>
              <Skeleton h={"20px"} />
              <Skeleton h={"20px"} />
              <Skeleton h={"20px"} />
            </Stack>
          </Flex>
        </GridItem>
      </Grid>
    );
  } else if (!loading && error) {
    body = <Flex>First Login</Flex>;
  } else if (!loading && !error) {
    body = (
      <>
        <Grid
          ml={"auto"}
          mr={"auto"}
          gap={4}
          w={"90%"}
          listStyleType="none"
          templateColumns={"repeat(auto-fit, minmax(300px, 0.25fr))"}
        >
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              name={room.name}
              admin={room.admin[0].username}
              id={room._id}
            />
          ))}
        </Grid>
        <Box pos={'fixed'} bottom={25} right={25}>
          <Button as={'a'} href="/createroom">
            + Create Room
          </Button>
        </Box>
      </>
    );
  }
  return <>{body}</>;
};

export default Dashboard;
