import { GeneralProfileFormValues } from "@/pages/Main/Profile";
import { Control, Controller } from "react-hook-form";
import { Field } from "./field";
import { Checkbox } from "./checkbox";
import { validateAcceptTerms } from "@/utils/validations";

interface CheckboxField {
  name: keyof GeneralProfileFormValues;
  content: string;
  control: Control<GeneralProfileFormValues, unknown>;
  invalid?: boolean;
  required?: boolean;
}

const CheckboxField = ({
  name,
  content,
  control,
  invalid = false,
  required = false,
}: CheckboxField) => {
  return (
    <Field invalid={invalid}>
      <Controller
        control={control}
        name={name}
        defaultValue="false"
        rules={required ? { validate: validateAcceptTerms } : {}}
        render={({ field }) => (
          <Checkbox
            variant="outline"
            _hover={{ cursor: "pointer" }}
            checked={field.value === "true"}
            onCheckedChange={({ checked }) =>
              field.onChange(checked ? "true" : "false")
            }
          >
            {content}
          </Checkbox>
        )}
      />
    </Field>
  );
};

export default CheckboxField;
