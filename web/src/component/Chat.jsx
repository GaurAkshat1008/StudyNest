import { Button, Flex, Input, VStack, Spinner } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { createChats, readChatById } from "../axios/axios";
import { useChats } from "../utils/useChats";
import { useLoaderData } from "react-router-dom";

const Chat = ({ room }) => {
  const socket = io("http://localhost:4000");
  const chatContRef = useRef(null);
  function createChat(roomId, msg, sender) {
    socket.emit("createChat", {
      chat: { roomId: roomId, message: msg, sender: sender },
    });
  }
  socket.on("chatCreated", (data) => {
    if (data.chat.roomId === room._id && !chatLoading) {
      setChatLoading(true);
      setChatLst([...chatLst, data]);
    }
  });
  const { loading: ld, user } = useLoaderData();
  let body = null;
  const { loading, chats } = useChats(room._id);
  const [chatLst, setChatLst] = useState([]);
  const [chatLoading, setChatLoading] = useState(true);
  async function convertChat(chats) {
    const chatDetailsPromises = chats.map((chatId) => readChatById(chatId));
    const chatDetailsData = await Promise.all(chatDetailsPromises);
    setChatLst(chatDetailsData);
  }
  useEffect(() => {
    if (!loading && chats) {
      convertChat(chats);
    }
  }, [loading, chats]);

  useEffect(() => {
    setChatLoading(false);
    if (chatContRef.current) {
      // chatContRef.current.scrollTop = chatContRef.current.scrollHeight;
    }
  }, [chatLoading, chatLst]);

  // console.log(chatLst);
  if (loading) {
    body = (
      <Flex justify={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  } else if (!loading && !ld && chats) {
    body = (
      <>
        {!chatLoading &&
          chatLst.map((ch, id) => {
            // console.log(ch)
            return (
              <Flex
                w={"25vw"}
                key={id}
                p={2}
                borderRadius={10}
                ml={ch.chat.sender === user._id ? "37vw" : "0vw"}
                bgColor={
                  ch.chat.sender === user._id ? "whatsapp.100" : "facebook.100"
                }
              >
                {ch.chat.message}
              </Flex>
            );
          })}
      </>
    );
  }
  return (
    <Flex justify={"center"} alignItems={"center"} p={4}>
      <Flex
        bgColor={"gray.100"}
        boxShadow={"lg"}
        w={"65vw"}
        h={"70vh"}
        borderRadius={15}
        flexDir={"column"}
        overflowY={"hidden"}
      >
        <Flex
          flex={0.9}
          w={"100%"}
          p={4}
          overflowX={"hidden"}
          overflowY={"scroll"}
          flexDir={"column-reverse"}
          // ref={chatContRef}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "lightgray",
              borderRadius: "24px",
            },
          }}
        >
          <VStack spacing={4}>{body}</VStack>
        </Flex>
        <Flex
          flex={0.1}
          borderTop={"1px solid lightgray"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Formik
            initialValues={{
              msg: "",
            }}
            onSubmit={async (values) => {
              const res = await createChats(room._id, values.msg);
              createChat(room._id, values.msg, user._id);
              values.msg = "";
            }}
          >
            {(props) => (
              <Form>
                <Flex>
                  <Input
                    type="text"
                    onChange={props.handleChange}
                    value={props.values.msg}
                    name="msg"
                    w={"45vw"}
                    bgColor={"white"}
                    mr={2}
                    autoComplete="off"
                    placeholder="Enter Message"
                  />
                  <Button
                    type="submit"
                    colorScheme="whatsapp"
                    isLoading={props.isSubmitting}
                  >
                    Send
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Flex>
      </Flex>
    </Flex>
  );
};

Chat.propTypes = {
  room: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func,
  values: PropTypes.string,
};

export default Chat;
