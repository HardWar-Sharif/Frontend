import CheckboxField from "@/components/ui/CheckboxField";
import FloatField from "@/components/ui/FloatField";
import SelectField from "@/components/ui/SelectField";
import {
  StepsContent,
  StepsItem,
  StepsList,
  StepsRoot,
} from "@/components/ui/steps";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useGetProfile } from "@/hooks/get-profile";
import { useUpdateProfile } from "@/hooks/update-profile";
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
  Alert,
} from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";
import { useEffect, useState } from "react";
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
    { label: "None", value: "none" },
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
  const [isCeSut, setIsCeSut] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm<GeneralProfileFormValues>({ mode: "onSubmit" });
  const {
    register: semesterRegister,
    handleSubmit: semesterSubmit,
    control: semesterControl,
    formState: { errors: semesterErrors },
    getValues: getSemesterValues,
    reset: semesterReset,
  } = useForm<SemesterProfileFormValues>({ mode: "onSubmit" });
  const { mutate } = useUpdateProfile();
  const { data, isLoading } = useGetProfile();
  const { t } = useTranslate();

  const responsiveFirstTitle = useBreakpointValue({
    base: undefined,
    sm: undefined,
    md: t("label.general_info"),
    lg: t("label.general_info"),
    xl: t("label.general_info"),
  });

  const responsiveSecondTitle = useBreakpointValue({
    base: undefined,
    sm: undefined,
    md: t("label.semester_info"),
    lg: t("label.semester_info"),
    xl: t("label.semester_info"),
  });

  const submitForm = () => {
    if (step == 0) {
      setIsCeSut(
        getValues("university") === "SUT" && getValues("department") === "CE"
      );
      setStep(step + 1);
    } else {
      const payload: UserProfile = {
        first_name: getValues("englishFirstName"),
        last_name: getValues("englishLastName"),
        persian_first_name: getValues("persianFirstName"),
        persian_last_name: getValues("persianLastName"),
        phone_number: getValues("phoneNumber"),
        national_code: getValues("nationalCode"),
        university_name: getValues("university"),
        department_name: getValues("department"),
        data_to_sponsor: getValues("dataToSponsor"),
      };
      if (isCeSut) {
        payload.student_id = getSemesterValues("studentId");
        payload.courses_list = getSemesterValues("coursesList");
        if (
          payload.courses_list?.length == 1 &&
          payload.courses_list[0] == "none"
        )
          payload.courses_list = [];
      }
      mutate(payload, {
        onSuccess: () => {
          toaster.create({
            title: "Profile Completed",
            type: "success",
          });
        },
        onError: () =>
          toaster.create({
            title: "Profile Error",
            type: "error",
          }),
      });
    }
  };

  useEffect(() => {
    if (!isLoading && data && data.is_completed) {
      reset({
        englishFirstName: data.first_name,
        englishLastName: data.last_name,
        persianFirstName: data.persian_first_name,
        persianLastName: data.persian_last_name,
        phoneNumber: data.phone_number,
        nationalCode: data.national_code,
        university: data.university_name,
        department: data.department_name,
        acceptTerms: "true",
        dataToSponsor: data.data_to_sponsor ? "true" : "false",
      });
      if (data.university_name == "SUT" && data.department_name == "CE")
        semesterReset({
          studentId: data.student_id,
          coursesList: data.courses_list,
        });
    }
  }, [data]);

  const firstStepContent = (
    <SimpleGrid w="full" gap={4} columns={{ base: 1, md: 2 }}>
      <GridItem>
        <FloatField
          label={t("label.persian_first_name")}
          formInput={register("persianFirstName", {
            pattern: {
              value: /^[\u0621-\u0651\u066B-\u06CC\u200c\s]+$/,
              message: t("message.persian_field"),
            },
            required: t("message.required", {
              field: t("label.persian_first_name"),
            }),
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
          label={t("label.persian_last_name")}
          formInput={register("persianLastName", {
            pattern: {
              value: /^[\u0621-\u0651\u066B-\u06CC\u200c\s]+$/,
              message: t("message.persian_field"),
            },
            required: t("message.required", {
              field: t("label.persian_last_name"),
            }),
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
          label={t("label.english_first_name")}
          formInput={register("englishFirstName", {
            pattern: {
              value: /^[a-zA-Z\s\-.]+$/,
              message: t("message.english_field"),
            },
            required: t("message.required", {
              field: t("label.english_first_name"),
            }),
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
          label={t("label.english_last_name")}
          formInput={register("englishLastName", {
            pattern: {
              value: /^[a-zA-Z\s\-.]+$/,
              message: t("message.english_field"),
            },
            required: t("message.required", {
              field: t("label.english_last_name"),
            }),
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
          label={t("label.phone_number")}
          formInput={register("phoneNumber", {
            validate: validatePhoneNumber,
            required: true,
          })}
          invalid={!!errors.phoneNumber}
        />
        {errors.phoneNumber && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {errors.phoneNumber.type == "validate"
              ? t("message.phone_number")
              : t("message.required", {
                  field: t("label.phone_number"),
                })}
          </Text>
        )}
      </GridItem>
      <GridItem>
        <FloatField
          label={t("label.national_code")}
          formInput={register("nationalCode", {
            validate: validateNationalCode,
            required: true,
          })}
          invalid={!!errors.nationalCode}
        />
        {errors.nationalCode && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {errors.nationalCode.type == "validate"
              ? t("message.invalid", { field: t("label.national_code") })
              : t("message.required", {
                  field: t("label.national_code"),
                })}
          </Text>
        )}
      </GridItem>
      <GridItem>
        <SelectField
          name="university"
          placeholder={t("label.university")}
          collection={universities}
          control={control}
          getValues={getValues}
          invalid={!!errors.university}
          errorText={t("message.required", {
            field: t("label.university"),
          })}
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
          placeholder={t("label.department")}
          collection={departments}
          control={control}
          getValues={getValues}
          invalid={!!errors.department}
          errorText={t("message.required", {
            field: t("label.department"),
          })}
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
          content={t("description.accept_conditions")}
          control={control}
          invalid={!!errors.acceptTerms}
          required
        />
        {errors.acceptTerms && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {t("message.should_check")}
          </Text>
        )}
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <CheckboxField
          name="dataToSponsor"
          content={t("description.accept_resume_share")}
          control={control}
        />
      </GridItem>
    </SimpleGrid>
  );

  const secondStepContent = (
    <SimpleGrid w="full" gap={4} columns={4}>
      <GridItem colStart={{ base: 1, md: 2 }} colSpan={{ base: 4, md: 2 }}>
        <FloatField
          label={t("label.student_id")}
          formInput={semesterRegister("studentId", {
            validate: (value) => validateStudentId(value, isCeSut),
            required: isCeSut,
          })}
          invalid={!!semesterErrors.studentId}
          disabled={!isCeSut}
        />
        {semesterErrors.studentId && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {semesterErrors.studentId.type == "validate"
              ? t("message.invalid", { field: t("label.student_id") })
              : t("message.required", {
                  field: t("label.student_id"),
                })}
          </Text>
        )}
      </GridItem>
      <GridItem colStart={{ base: 1, md: 2 }} colSpan={{ base: 4, md: 2 }}>
        <SelectField
          name="coursesList"
          placeholder={t("label.your_courses")}
          collection={courses}
          control={semesterControl}
          getValues={getSemesterValues}
          invalid={!!semesterErrors.coursesList}
          errorText={t("message.required", {
            field: t("label.your_courses"),
          })}
          multiple
          disabled={!isCeSut}
        />
        {semesterErrors.coursesList && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {semesterErrors.coursesList.message}
          </Text>
        )}
      </GridItem>
      {!isCeSut && (
        <GridItem colStart={{ base: 1, md: 2 }} colSpan={{ base: 4, md: 2 }}>
          <Alert.Root status="info">
            <Alert.Indicator />
            <Alert.Title>{t("message.skip_step")}</Alert.Title>
          </Alert.Root>
        </GridItem>
      )}
    </SimpleGrid>
  );

  return (
    <>
      <Card.Root
        size="lg"
        // w={{ base: "90vw", sm: "70vw", md: "65vw", lg: "50vw" }}
        overflowY="scroll"
        scrollbar={{ md: "hidden" }}
        h={{ base: "72vh", md: "60vh" }}
        mb={{ base: "100px", md: "5vh" }}
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
              {t("label.profile")}
            </Card.Title>
          </Card.Header>
        </Center>
        <Card.Body>
          <StepsRoot step={step} count={2} linear>
            <StepsList>
              <StepsItem index={0} title={responsiveFirstTitle} />
              <StepsItem index={1} title={responsiveSecondTitle} />
            </StepsList>
            <StepsContent index={0}>
              {step == 0 && firstStepContent}
            </StepsContent>
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
              {t("label.previous")}
            </Button>
            <Button
              variant="solid"
              size="lg"
              onClick={
                step == 0
                  ? handleSubmit(submitForm)
                  : semesterSubmit(submitForm)
              }
            >
              {step == 0 ? t("label.next") : t("label.complete_profile")}
            </Button>
          </Flex>
        </Card.Footer>
      </Card.Root>
      <Toaster />
    </>
  );
};

export default Profile;
