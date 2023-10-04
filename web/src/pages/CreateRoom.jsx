import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import { createRoom } from "../axios/axios";
import InputField from "../component/InputField";
import { toErrorMap } from "../utils/toErrorMap";

const CreateRoom = () => {
  // const data = useLoaderData();
  const random = Math.floor(Math.random() * 10) + 1;
  return (
    <Flex
      mt={-8}
      h={"89vh"}
      justify={"center"}
      bgImage={
        "linear-gradient(rgb(0,0,0,0.5), rgb(0,0,0,0.5)), url(https://source.unsplash.com/random?wallpapers)"
      }
      bgSize={"cover"}
      bgPosition={"center"}
      bgRepeat={"no-repeat"}
    >
      <Stack spacing={8} w={"40vw"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color={"white"}>
            Create a Room
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Formik
              initialValues={{
                name: "",
                desc: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                const response = await createRoom(
                  values.name,
                  values.desc,
                  random
                );
                if (response.errors) {
                  setErrors(toErrorMap(response.errors));
                } else {
                  const link = `/room/${response.room._id}`;
                  window.location.href = link;
                }
              }}
            >
              {(props) => (
                <Form>
                  <Stack spacing={4}>
                    <InputField
                      name="name"
                      type="text"
                      placeholder="Name"
                      label="Name"
                    />
                    <InputField
                      name="desc"
                      type="text"
                      placeholder="Description"
                      label="Description"
                      textarea
                    />

                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      type="submit"
                      width={"100%"}
                      isLoading={props.isSubmitting}
                    >
                      Create Room
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

CreateRoom.propTypes = {
  isSubmitting: PropTypes.bool,
};

export default CreateRoom;
