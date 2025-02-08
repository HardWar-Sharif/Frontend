import { Box, Field, Input, defineStyle } from "@chakra-ui/react";

interface FloatFieldProps {
  label: string;
  marginTop?: number;
}

const FloatField = ({ label, marginTop = 2 }: FloatFieldProps) => {
  return (
    <Field.Root mt={marginTop}>
      <Box pos="relative" w="full">
        <Input
          className="peer"
          placeholder=""
          size="lg"
          borderColor="red.muted"
          bgColor="red.950"
          focusRingColor="bg"
          _focus={{ borderColor: "red.emphasized" }}
          color="red.50"
        />
        <Field.Label css={floatingStyles}>{label}</Field.Label>
      </Box>
    </Field.Root>
  );
};

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg/0",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  fontSize: "16px",
  pointerEvents: "none",
  transition: "position",
  color: "red.200",
  _peerPlaceholderShown: {
    color: "red.fg",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "red.200",
    top: "-3",
    insetStart: "2",
  },
});

export default FloatField;
