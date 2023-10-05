import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
  ModalHeader,
  Flex,
  Input,
  Grid,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { handleUpload, addResource } from "../axios/axios";
import { useEffect, useState } from "react";
import Resource from "./Resource";

const Resources = ({ room }) => {
  const [upload, setUpload] = useState(false);
  const [resources, setResources] = useState([]);
  useEffect(() => {
    setResources(room.resources);
  }, [room, upload, resources]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Grid
        gap={4}
        w={"90%"}
        listStyleType="none"
        templateColumns={"repeat(auto-fit, minmax(300px, 0.25fr))"}
      >
        {resources.map((resource, id) => {
          return (
            <Resource
              key={id}
              url={resource}
              name={resource.slice(87, resource.length-40)}
            />
          );
        })}
      </Grid>
      <Box pos={"fixed"} bottom={25} right={25}>
        <Button onClick={onOpen}>Add Resource</Button>
      </Box>
      <Modal isCentered motionPreset="scale" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                file: {},
              }}
              onSubmit={async (values) => {
                const { file } = values;
                // console.log(file);
                const url = await handleUpload(file, room);
                await addResource(room._id, url);
                setUpload(!upload);
              }}
            >
              {(props) => (
                <Form>
                  <Flex>
                    <Input
                      type="file"
                      onChange={(e) => {
                        props.values.file = e.target.files[0];
                      }}
                      // value={props.values.file}
                      name="file"
                      w={"45vw"}
                      mr={2}
                    />

                    <Button
                      type="submit"
                      colorScheme="whatsapp"
                      isLoading={props.isSubmitting}
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

export default Resources;
