import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { login } from "../axios/axios";
import InputField from "../component/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import PropTypes from "prop-types";

const Login = () => {
  return (
    <Flex flexDir={'row'} h={'100vh'}>
      <Flex flex={0.6} backgroundImage={'url(https://source.unsplash.com/random?wallpapers)'} backgroundRepeat={'no-repeat'} backgroundSize={'cover'} backgroundPosition={'center'} backgroundColor={'gray.200'}></Flex>
      <Flex flex={0.4} p={8} justifyContent={'center'} alignItems={'center'} boxShadow={'2xl'}>
      <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values.email, values.password);
            if (response.errors) {
              setErrors(toErrorMap(response.errors));
            } else {
              // window.location.href = "/dashboard";
            }
          }}
        >
          {(props) => (
            <Form>
              <Flex justifyContent={'center'}>
                <Text fontSize="2xl" fontWeight="bold" color="black" mb="10px">
                  Sign In
                </Text>
              </Flex>
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
              <Flex m={2} justifyContent={'space-between'}>
                <a href="/forgotpassword">Forgot your password?</a>
                <a href="/register">New here ?</a>
              </Flex>
              <Button
                type="submit"
                backgroundColor={"blue.700"}
                color={'white'}
                isLoading={props.isSubmitting}
                mt={4}
                w={'100%'}
              >
                SIGN IN
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

Login.propTypes = {
  isSubmitting: PropTypes.bool,
};

export default Login;
