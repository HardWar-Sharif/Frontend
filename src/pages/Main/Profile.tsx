import CheckboxField from "@/components/ui/CheckboxField";
import FloatField from "@/components/ui/FloatField";
import SelectField from "@/components/ui/SelectField";
import {
  StepsContent,
  StepsItem,
  StepsList,
  StepsRoot,
} from "@/components/ui/steps";
import {
  validateNationalCode,
  validatePhoneNumber,
  validateStudentId,
} from "@/utils/validations";
import {
  Card,
  Center,
  Flex,
  Button,
  SimpleGrid,
  GridItem,
  createListCollection,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const universities = createListCollection({
  items: [
    { label: "Sharif University of Technology", value: "SUT" },
    { label: "Other", value: "other" },
  ],
});

const departments = createListCollection({
  items: [
    { label: "Computer Engineering", value: "CE" },
    { label: "Electrical Engineering", value: "EE" },
    { label: "Other", value: "other" },
  ],
});

const courses = createListCollection({
  items: [
    { label: "Logical Design", value: "LD" },
    { label: "Digital System Design", value: "DSD" },
    { label: "Computer Architecture", value: "CA" },
    { label: "Operating Systems", value: "OS" },
  ],
});

export interface GeneralProfileFormValues {
  persianFirstName: string;
  persianLastName: string;
  englishFirstName: string;
  englishLastName: string;
  phoneNumber: string;
  nationalCode: string;
  university: string;
  department: string;
  acceptTerms: "true" | "false";
  dataToSponsor: "true" | "false";
}

export interface SemesterProfileFormValues {
  studentId: string;
  coursesList: Array<string>;
}

const Profile = () => {
  const [step, setStep] = useState<number>(0);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<GeneralProfileFormValues>({ mode: "onSubmit" });

  const {
    register: semesterRegister,
    handleSubmit: semesterSubmit,
    control: semesterControl,
    formState: { errors: semesterErrors },
    getValues: getSemesterValues,
  } = useForm<SemesterProfileFormValues>({ mode: "onSubmit" });

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

  const submitForm = () => {
    if (step == 0) setStep(step + 1);
    else console.log("s", getValues(), getSemesterValues());
  };

  const firstStepContent = (
    <SimpleGrid w="full" gap={4} columns={{ base: 1, md: 2 }}>
      <GridItem>
        <FloatField
          label="First Name (Persian)"
          formInput={register("persianFirstName", {
            pattern: {
              value: /^[\u0621-\u0651\u066B-\u06CC\s]+$/,
              message: "This field should be in persian.",
            },
            required: "First Name (Persian) is required.",
          })}
          invalid={!!errors.persianFirstName}
        />
        {errors.persianFirstName && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {errors.persianFirstName.message}
          </Text>
        )}
      </GridItem>
      <GridItem>
        <FloatField
          label="Last Name (Persian)"
          formInput={register("persianLastName", {
            pattern: {
              value: /^[\u0621-\u0651\u066B-\u06CC\s]+$/,
              message: "This field should be in persian.",
            },
            required: "Last Name (Persian) is required.",
          })}
          invalid={!!errors.persianLastName}
        />
        {errors.persianLastName && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {errors.persianLastName.message}
          </Text>
        )}
      </GridItem>
      <GridItem>
        <FloatField
          label="First Name (English)"
          formInput={register("englishFirstName", {
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: "This field should be in english.",
            },
            required: "First Name (English) is required.",
          })}
          invalid={!!errors.englishFirstName}
        />
        {errors.englishFirstName && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {errors.englishFirstName.message}
          </Text>
        )}
      </GridItem>
      <GridItem>
        <FloatField
          label="Last Name (English)"
          formInput={register("englishLastName", {
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: "This field should be in english.",
            },
            required: "Last Name (English) is required.",
          })}
          invalid={!!errors.englishLastName}
        />
        {errors.englishLastName && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {errors.englishLastName.message}
          </Text>
        )}
      </GridItem>
      <GridItem>
        <FloatField
          label="Phone Number"
          formInput={register("phoneNumber", {
            validate: validatePhoneNumber,
            required: true,
          })}
          invalid={!!errors.phoneNumber}
        />
        {errors.phoneNumber && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {errors.phoneNumber.type == "validate"
              ? "Phone Number should start with 0."
              : "Phone Number is required."}
          </Text>
        )}
      </GridItem>
      <GridItem>
        <FloatField
          label="National Code"
          formInput={register("nationalCode", {
            validate: validateNationalCode,
            required: true,
          })}
          invalid={!!errors.nationalCode}
        />
        {errors.nationalCode && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {errors.nationalCode.type == "validate"
              ? "National Code is invalid."
              : "National Code is required."}
          </Text>
        )}
      </GridItem>
      <GridItem>
        <SelectField
          name="university"
          placeholder="University"
          collection={universities}
          control={control}
          getValues={getValues}
          invalid={!!errors.university}
          errorText="University is required."
        />
        {errors.university && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {errors.university.message}
          </Text>
        )}
      </GridItem>
      <GridItem>
        <SelectField
          name="department"
          placeholder="Department"
          collection={departments}
          control={control}
          getValues={getValues}
          invalid={!!errors.department}
          errorText="Department is required."
        />
        {errors.department && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {errors.department.message}
          </Text>
        )}
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <CheckboxField
          name="acceptTerms"
          content="I accept the Hardwar terms and conditions."
          control={control}
          invalid={!!errors.acceptTerms}
          required
        />
        {errors.acceptTerms && (
          <Text fontSize="sm" mt={1} color="red.solid">
            You should check this.
          </Text>
        )}
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <CheckboxField
          name="dataToSponsor"
          content="I am OK to share my data and resume with sponsors of Hardwar."
          control={control}
        />
      </GridItem>
    </SimpleGrid>
  );

  const secondStepContent = (
    <SimpleGrid w="full" gap={4} columns={4}>
      <GridItem colStart={2} colSpan={2}>
        <FloatField
          label="Student ID"
          formInput={semesterRegister("studentId", {
            validate: validateStudentId,
            required: true,
          })}
          invalid={!!semesterErrors.studentId}
        />
        {semesterErrors.studentId && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {semesterErrors.studentId.type == "validate"
              ? "Student ID is invalid."
              : "student ID is required."}
          </Text>
        )}
      </GridItem>
      <GridItem colStart={2} colSpan={2}>
        <SelectField
          name="coursesList"
          placeholder="Your Courses"
          collection={courses}
          control={semesterControl}
          getValues={getSemesterValues}
          invalid={!!semesterErrors.coursesList}
          errorText="Courses is required."
          multiple
        />
        {semesterErrors.coursesList && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {semesterErrors.coursesList.message}
          </Text>
        )}
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
          <StepsContent index={0}>{step == 0 && firstStepContent}</StepsContent>
          <StepsContent index={1}>
            {step == 1 && secondStepContent}
          </StepsContent>
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
          <Button
            variant="solid"
            size="lg"
            onClick={
              step == 0 ? handleSubmit(submitForm) : semesterSubmit(submitForm)
            }
          >
            {step == 0 ? "Next" : "Complete Profile"}
          </Button>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};

export default Profile;
