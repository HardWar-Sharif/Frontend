import { Checkbox } from "@/components/ui/checkbox";
import FloatField from "@/components/ui/FloatField";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import {
  StepsContent,
  StepsItem,
  StepsList,
  StepsRoot,
} from "@/components/ui/steps";
import {
  Card,
  Center,
  Flex,
  Button,
  SimpleGrid,
  GridItem,
  createListCollection,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";

const inputStyles = {
  borderWidth: 1,
  borderColor: "red.muted",
  bgColor: "red.950",
  focusRingColor: "bg",
  color: "red.50",
  _invalid: { bgColor: "red.muted" },
};

const universityItems = createListCollection({
  items: [
    { label: "Sharif University of Technology", value: "SUT" },
    { label: "Other", value: "other" },
  ],
});

const departmentItems = createListCollection({
  items: [
    { label: "Computer Engineering", value: "CE" },
    { label: "Electrical Engineering", value: "EE" },
    { label: "Other", value: "other" },
  ],
});

const courseItems = createListCollection({
  items: [
    { label: "Logical Design", value: "LD" },
    { label: "Digital System Design", value: "DSD" },
    { label: "Computer Architecture", value: "CA" },
    { label: "Operating Systems", value: "OS" },
  ],
});

const Profile = () => {
  const [step, setStep] = useState<number>(0);
  const [universitySelected, setUniversitySelected] = useState<boolean>(false);
  const [departmentSelected, setDepartmentSelected] = useState<boolean>(false);

  const responsiveFirstTitle = useBreakpointValue({
    base: undefined,
    sm: undefined,
    md: undefined,
    lg: "General Information",
    xl: "General Information",
  });

  const responsiveSecondTitle = useBreakpointValue({
    base: undefined,
    sm: undefined,
    md: undefined,
    lg: "Semester Information",
    xl: "Semester Information",
  });

  const firstStepContent = (
    <SimpleGrid w="full" gap={4} columns={{ base: 1, md: 2 }}>
      <GridItem>
        <FloatField label="First Name (Persian)" formInput={null} />
      </GridItem>
      <GridItem>
        <FloatField label="Last Name (Persian)" formInput={null} />
      </GridItem>
      <GridItem>
        <FloatField label="First Name (English)" formInput={null} />
      </GridItem>
      <GridItem>
        <FloatField label="Last Name (English)" formInput={null} />
      </GridItem>
      <GridItem>
        <FloatField label="Phone Number" formInput={null} />
      </GridItem>
      <GridItem>
        <FloatField label="National Code" formInput={null} />
      </GridItem>
      <GridItem>
        <SelectRoot
          mt={2}
          collection={universityItems}
          size="lg"
          onValueChange={({ value }) =>
            !!value.length && setUniversitySelected(true)
          }
        >
          <SelectTrigger>
            <SelectValueText
              placeholder="University"
              color={universitySelected ? "fg" : "red.fg"}
            />
          </SelectTrigger>
          <SelectContent {...inputStyles}>
            {universityItems.items.map((university) => (
              <SelectItem
                item={university}
                key={university.value}
                _hover={{ bgColor: "red.muted" }}
                _selected={{ bgColor: "red.muted" }}
              >
                {university.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </GridItem>
      <GridItem>
        <SelectRoot
          mt={2}
          collection={departmentItems}
          size="lg"
          onValueChange={({ value }) =>
            !!value.length && setDepartmentSelected(true)
          }
        >
          <SelectTrigger>
            <SelectValueText
              placeholder="Department"
              color={departmentSelected ? "fg" : "red.fg"}
            />
          </SelectTrigger>
          <SelectContent {...inputStyles}>
            {departmentItems.items.map((department) => (
              <SelectItem
                item={department}
                key={department.value}
                _hover={{ bgColor: "red.muted" }}
                _selected={{ bgColor: "red.muted" }}
              >
                {department.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <Checkbox variant="outline" _hover={{ cursor: "pointer" }}>
          I accept the Hardwar terms and conditions.
        </Checkbox>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <Checkbox variant="outline" _hover={{ cursor: "pointer" }}>
          I am OK to share my data and resume with sponsors of Hardwar.
        </Checkbox>
      </GridItem>
    </SimpleGrid>
  );

  const secondStepContent = (
    <SimpleGrid w="full" gap={4} columns={4}>
      <GridItem colStart={2} colSpan={2}>
        <FloatField label="Student ID" formInput={null} />
      </GridItem>
      <GridItem colStart={2} colSpan={2}>
        <SelectRoot
          multiple
          mt={2}
          collection={courseItems}
          size="lg"
          onValueChange={({ value }) =>
            !!value.length && setUniversitySelected(true)
          }
        >
          <SelectTrigger>
            <SelectValueText
              placeholder="Your Courses"
              color={universitySelected ? "fg" : "red.fg"}
            />
          </SelectTrigger>
          <SelectContent {...inputStyles}>
            {courseItems.items.map((course) => (
              <SelectItem
                item={course}
                key={course.value}
                _hover={{ bgColor: "red.muted" }}
                _selected={{ bgColor: "red.muted" }}
              >
                {course.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </GridItem>
    </SimpleGrid>
  );

  return (
    <Card.Root
      size="lg"
      w={{ base: "90vw", sm: "70vw", md: "65vw", lg: "50vw" }}
      mb="5vh"
      borderColor="red.emphasized"
      bgColor="bg"
      shadow="0 0 60px var(--shadow-color)"
      shadowColor="red.subtle"
      borderWidth={2}
    >
      <Center>
        <Card.Header>
          <Card.Title
            fontSize={36}
            color="red.solid"
            textShadow="0 0 20px var(--shadow-color)"
            shadowColor="red.solid"
          >
            Profile
          </Card.Title>
        </Card.Header>
      </Center>
      <Card.Body>
        <StepsRoot step={step} count={2} linear>
          <StepsList>
            <StepsItem index={0} title={responsiveFirstTitle} />
            <StepsItem index={1} title={responsiveSecondTitle} />
          </StepsList>
          <StepsContent index={0}>{firstStepContent}</StepsContent>
          <StepsContent index={1}>{secondStepContent}</StepsContent>
        </StepsRoot>
      </Card.Body>
      <Card.Footer flexDirection="column" alignItems="flex-end">
        <Flex gap={3}>
          <Button
            variant="outline"
            size="lg"
            borderWidth={2}
            onClick={() => setStep(step - 1)}
            disabled={step == 0}
          >
            Previous
          </Button>
          <Button variant="solid" size="lg" onClick={() => setStep(step + 1)}>
            {step == 0 ? "Next" : "Complete Profile"}
          </Button>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};

export default Profile;
