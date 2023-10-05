import { Flex, Image } from "@chakra-ui/react";
import { useRoom } from "../../utils/useRoom";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Participants from "../../component/Participants";
import Chat from "../../component/Chat";
import Resources from "../../component/Resources";

const Room = () => {
  const roomId = window.location.pathname.split("/")[2];
  const { loading, room, error } = useRoom(roomId);
  let body = null;
  if (loading) {
    body = <div>loading...</div>;
  } else if (!loading && error) {
    body = <div>Room not found</div>;
  } else {
    body = (
      <Flex w={"100vw"} flexDir={"column"} overflow={"hidden"}>
        <Flex align={"center"} justify={"center"}>
          <Image
            src={`/images/ci${room.img}.png`}
            h={"40vh"}
            w={"80vw"}
            mb={4}
          />
        </Flex>
        <Flex w={"100%"}>
          <Tabs isFitted variant={"soft-rounded"} w={"100%"} defaultIndex={0}>
            <TabList>
              <Tab>Resources</Tab>
              <Tab>Chat</Tab>
              <Tab>Participants</Tab>
              <Tab>Group Tasks</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Resources room={room} />
              </TabPanel>
              <TabPanel w={"100%"}>
                <Chat room={room} />
              </TabPanel>
              <TabPanel>
                <Participants room={room} />
              </TabPanel>
              <TabPanel>
                <p>four!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    );
  }
  return <>{body}</>;
};

export default Room;
