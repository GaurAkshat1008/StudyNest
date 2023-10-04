import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import InputField from "../component/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import PropTypes from "prop-types";
import { register } from "../axios/axios";

const Register = () => {
  return (
    <Flex flexDir={"row"} h={"100vh"}>
      <Flex
        flex={0.4}
        p={8}
        justifyContent={"center"}
        alignItems={"center"}
        boxShadow={"2xl"}
      >
        <Formik
          initialValues={{
            name: "",
            username: "",
            email: "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register(
              values.name,
              values.username,
              values.email,
              values.password
            );
            if (response.errors) {
              setErrors(toErrorMap(response.errors));
            } else {
              window.location.href = "/";
            }
          }}
        >
          {(props) => (
            <Form>
              <Flex justifyContent={"center"}>
                <Text fontSize="2xl" fontWeight="bold" color="black" mb="10px">
                  Sign Up
                </Text>
              </Flex>
              <Box mt={4}>
                <InputField
                  name="name"
                  type="text"
                  placeholder="Name"
                  label="Name"
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="username"
                  type="text"
                  placeholder="Username"
                  label="Username"
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="email"
                  type="email"
                  placeholder="Email"
                  label="Email"
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="password"
                  type="password"
                  placeholder="Password"
                  label="Password"
                />
              </Box>
              <Flex m={2}>
                <a href="/login">Already Registered ?</a>
              </Flex>
              <Button
                type="submit"
                backgroundColor={"blue.700"}
                color={"white"}
                isLoading={props.isSubmitting}
                mt={4}
                w={"100%"}
              >
                SIGN IN
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
      <Flex
        flex={0.6}
        backgroundImage={"url(https://source.unsplash.com/random?wallpapers)"}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundColor={"gray.200"}
      ></Flex>
    </Flex>
  );
};

Register.propTypes = {
  isSubmitting: PropTypes.bool,
};

export default Register;