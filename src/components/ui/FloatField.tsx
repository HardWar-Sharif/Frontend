import {
  Box,
  ConditionalValue,
  Field,
  Input,
  defineStyle,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FloatFieldProps {
  label: string;
  marginTop?: number;
  formInput: UseFormRegisterReturn;
  invalid?: boolean;
  disabled?: boolean;
}

const FloatField = ({
  label,
  marginTop = 2,
  formInput,
  invalid = false,
  disabled = false,
}: FloatFieldProps) => {
  return (
    <Field.Root mt={marginTop} invalid={invalid}>
      <Box pos="relative" w="full">
        <Input {...inputStyles} disabled={disabled} {...formInput} />
        <Field.Label css={floatingStyles}>{label}</Field.Label>
      </Box>
    </Field.Root>
  );
};

const inputStyles = {
  className: "peer",
  placeholder: "",
  size: "lg" as ConditionalValue<"lg">,
  borderWidth: 2,
  borderColor: "red.muted",
  bgColor: "red.950",
  focusRingColor: "bg",
  _focus: { borderColor: "red.emphasized" },
  color: "red.50",
  _invalid: { bgColor: "red.muted" },
};

const floatingStyles = defineStyle({
  pos: "absolute",
  bgColor: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  fontSize: "16px",
  pointerEvents: "none",
  transition: "position",
  color: "red.200",
  _peerPlaceholderShown: {
    bgColor: "bg/0",
    color: "red.fg",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    bgColor: "bg",
    color: "red.200",
    top: "-3",
    insetStart: "2",
  },
  _peerDisabled: {
    color: "red.200/60",
  },
});

export default FloatField;
