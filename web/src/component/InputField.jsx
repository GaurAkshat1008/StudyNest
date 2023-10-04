import PropTypes from "prop-types";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
// import { TextField } from "@mui/material";
import { useField } from "formik";

const InputField = ({ textarea, label, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const InputComponent = textarea ? Textarea : Input;

  return (
    <FormControl isInvalid={meta.touched && meta.error} w={"30vw"}>
      {label && <FormLabel htmlFor={field.name} ml={2} fontSize={"md"} color={"blue.700"}>
        {label}
      </FormLabel>}
      <InputComponent
        {...field}
        {...props}
        id={field.name}
        autoComplete="off"
        placeholder={placeholder}
      />
      {meta.touched && meta.error ? (
        <FormErrorMessage color={"red"}>&#9888; {meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

InputField.propTypes = {
  textarea: PropTypes.bool,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default InputField;
