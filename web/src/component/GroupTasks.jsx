import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { Form, Formik } from "formik";
import { addTask, removeTask } from "../axios/axios";

const GroupTasks = ({ room }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const date = new Date();
  const result = format(date, "dd/MM/yyyy");
  return (
    <>
      <Grid
        ml={"auto"}
        mr={"auto"}
        gap={4}
        w={"90%"}
        listStyleType="none"
        templateColumns={"repeat(auto-fit, minmax(400px, 0.25fr))"}
      >
        {room.tasks.map((task, id) => {
          return (
            <GridItem key={id}>
              <Flex
                borderRadius={10}
                mb={4}
                h={20}
                bgColor={"lightgray"}
                p={4}
                flexDir={"row"}
                justify={"space-between"}
                align={"center"}
              >
                <Flex
                  fontSize={"1.5rem"}
                  fontWeight={"bold"}
                  flexDir={"column"}
                >
                  {task.task}
                  <Box fontSize={"0.75rem"} fontWeight={"normal"}>
                    To be done By:{" "}
                    {format(parseISO(task.deadline.slice(0, 10)), "dd/MM/yyyy")}{" "}
                    {task.deadline.slice(11)}
                  </Box>
                </Flex>
                <Button
                  bgColor={"transparent"}
                  onClick={async () => {
                    const res = await removeTask(room._id, task._id);
                    // console.log(res);
                    window.location.reload()
                  }}
                >
                  <DeleteIcon fontSize={"2xl"} color={"red.700"} />
                </Button>
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
      <Box pos={"fixed"} bottom={25} right={25}>
        <Button onClick={onOpen}>Add Task</Button>
      </Box>
      <Modal isCentered motionPreset="scale" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                task: "",
                deadline: result,
              }}
              onSubmit={async (values) => {
                const res = await addTask(room._id, values);
                console.log(res);
              }}
            >
              {(props) => (
                <Form>
                  <Flex flexDir={"column"}>
                    <Input
                      type="text"
                      value={props.values.task}
                      onChange={props.handleChange}
                      name="task"
                      mb={2}
                    />
                    <Input
                      type="datetime-local"
                      value={props.values.dealine}
                      onChange={props.handleChange}
                      name="deadline"
                      mb={2}
                    />

                    <Button
                      type="submit"
                      colorScheme="whatsapp"
                      isLoading={props.isSubmitting}
                      ml={"auto"}
                      w={"20%"}
                    >
                      Add
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
            <Flex flexDir={"column"}></Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupTasks;
