import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormGetValues,
} from "react-hook-form";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./select";
import { useState } from "react";
import { ListCollection } from "@chakra-ui/react";
import { Field } from "./field";

const inputStyles = {
  borderWidth: 1,
  borderColor: "red.muted",
  bgColor: "red.950",
  focusRingColor: "bg",
  color: "red.50",
  _invalid: { bgColor: "red.muted" },
};

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  collection: ListCollection<{ label: string; value: string }>;
  control: Control<T, unknown>;
  getValues: UseFormGetValues<T>;
  invalid?: boolean;
  errorText: string;
  multiple?: boolean;
  disabled?: boolean;
}

const SelectField = <T extends FieldValues>({
  name,
  placeholder,
  collection,
  control,
  getValues,
  invalid = false,
  errorText,
  multiple = false,
  disabled = false,
}: SelectFieldProps<T>) => {
  const [itemSelected, setItemSelected] = useState<boolean>(!!getValues(name));

  return (
    <Field invalid={invalid}>
      <Controller
        control={control}
        name={name}
        rules={{ required: { value: !disabled, message: errorText } }}
        render={({ field }) => (
          <SelectRoot
            multiple={multiple}
            disabled={disabled}
            mt={2}
            name={field.name}
            value={multiple ? field.value : [field.value]}
            collection={collection}
            size="lg"
            onValueChange={({ value }) => {
              if (value.length) setItemSelected(true);
              field.onChange(multiple ? value : value[0]);
            }}
          >
            <SelectTrigger>
              <SelectValueText
                placeholder={placeholder}
                color={itemSelected ? "fg" : "red.fg"}
              />
            </SelectTrigger>
            <SelectContent {...inputStyles}>
              {collection.items.map((item) => (
                <SelectItem
                  item={item}
                  key={item.value}
                  _hover={{ bgColor: "red.muted" }}
                  _selected={{ bgColor: "red.muted" }}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        )}
      />
    </Field>
  );
};

export default SelectField;
