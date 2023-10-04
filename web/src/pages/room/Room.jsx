import { Flex } from "@chakra-ui/react";
import { useRoom } from "../../utils/useRoom";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Participants from "../../component/Participants";
import Chat from "../../component/Chat";

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
      <Flex w={"100vw"}>
        <Flex w={"100%"}>
          <Tabs isFitted variant={"soft-rounded"} w={"100%"} defaultIndex={1}>
            <TabList>
              <Tab>Resources</Tab>
              <Tab>Chat</Tab>
              <Tab>Participants</Tab>
              <Tab>Group Tasks</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
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
