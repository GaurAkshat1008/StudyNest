import {
  Box,
  Button,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex,
  Input,
  VStack,
  Avatar,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useLoaderData } from "react-router-dom";
import { useGetUsers } from "../utils/useGetUsers";
import Participant from "./Participant";
import { Formik, Form } from "formik";
import { invitemember, searchUser } from "../axios/axios";
import { useState } from "react";

const Participants = ({ room }) => {
  const { loading, users } = useGetUsers(room);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = useLoaderData();
  let body = null;
  const [invitees, setInvitees] = useState(null);
  if (loading) {
    body = <div>loading...</div>;
  } else if (!loading && users.length === 0) {
    body = <div>No Participants found</div>;
  } else {
    body = (
      <Grid>
        {users.map((user, id) => {
          return <Participant user={user.user} key={id} room={room} />;
        })}
      </Grid>
    );
  }
  const onC = () => {
    onClose();
    setInvitees(null); 
  }
  return (
    <>
      {body}
      {!data.loading && room.admin.includes(data.user._id) && (
        <>
          <Box pos={"fixed"} onClick={onOpen} bottom={25} right={40}>
            <Button>+ Invite</Button>
          </Box>
          <Modal
            isCentered
            motionPreset="scale"
            isOpen={isOpen}
            onClose={onC}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Invite Members</ModalHeader>
              {/* <ModalCloseButton /> */}
              <ModalBody
                maxH={"50vh"}
                overflowY={"scroll"}
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
                <Formik
                  initialValues={{
                    emailOrUsername: "",
                  }}
                  onSubmit={async (values) => {
                    const res = await searchUser(values.emailOrUsername);
                    if (
                      res.errors &&
                      res.errors[0].message === "No user found"
                    ) {
                      setInvitees(
                        <Flex
                          h={12}
                          justifyContent={"center"}
                          align={"center"}
                          bgColor={"lightgray"}
                          m={4}
                          fontSize={20}
                          borderRadius={10}
                          p={12}
                        >
                          No one found...
                        </Flex>
                      );
                    } else if (res.user) {
                      const filtered = res.user.filter(
                        (us) => !room.users.includes(us._id)
                        );
                        console.log(filtered);
                      if (filtered.length === 0) {
                        setInvitees(
                          <Flex
                            h={12}
                            justifyContent={"center"}
                            align={"center"}
                            bgColor={"lightgray"}
                            m={4}
                            fontSize={20}
                            borderRadius={10}
                            p={12}
                          >
                            No one found...
                          </Flex>
                        );
                      } else {
                        setInvitees(
                          filtered.user.map((us, id) => {
                            return (
                              <>
                                <Flex
                                  h={12}
                                  justifyContent={"center"}
                                  align={"center"}
                                  bgColor={"lightgray"}
                                  m={4}
                                  fontSize={20}
                                  borderRadius={10}
                                  p={12}
                                  cursor={"pointer"}
                                  onClick={async () => {
                                    const res = await invitemember(
                                      room._id,
                                      us._id
                                    );
                                    console.log(res);
                                    setInvitees(null);
                                    onClose();
                                  }}
                                >
                                  <Avatar
                                    name={us.username}
                                    mr={2}
                                    size={"md"}
                                  />
                                  <Flex flexDir={"column"}>
                                    <Box>{us.username}</Box>
                                    {us.email}
                                  </Flex>
                                </Flex>
                              </>
                            );
                          })
                        );
                      }
                    }
                  }}
                >
                  {(props) => (
                    <Form>
                      <Flex>
                        <Input
                          type="text"
                          onChange={props.handleChange}
                          value={props.values.msg}
                          name="emailOrUsername"
                          w={"45vw"}
                          bgColor={"white"}
                          mr={2}
                          autoComplete="off"
                          placeholder="Enter username or email"
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
                <Flex flexDir={"column"}>{invitees}</Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    onClose();
                    setInvitees(null);
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

Participants.propTypes = {
  room: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func,
  values: PropTypes.string,
};

export default Participants;
