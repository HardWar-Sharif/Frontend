import { Box, Stack, Flex } from "@chakra-ui/react"
import Footer from "../Landing/Footer";
import StaffSection from "./StaffSection";

// Move to a separate json file
const staff = [
  {
    "team": "Technical Team",
    "members": [
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati with a very long name", "subtitle": "President is a veryyyy long title", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
    ]
  },
  {
    "team": "Technical Team",
    "members": [
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
    ]
  },
  {
    "team": "Technical Team",
    "members": [
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
      {"name": "Saeed Forati", "subtitle": "President", "image": "staff/example-staff.png"},
    ]
  },
]

const StaffPage = () => {
  return (
    <Box
      fontFamily="DM Sans"
      overflow="hidden"
      maxWidth="100vw"
      position="relative"
      clipPath="inset(0 0 0 0)"
    >
      <Stack my="25vh" gap={10}>
        {staff.map((item, index) => (
          <Stack gap={10}>
            {index !== 0 && <Flex bgColor="colorPalette.700" h="1px" mx="7%" />}
            <StaffSection team={item.team} members={item.members} />
          </Stack>
        ))}
      </Stack>
      <Footer />
    </Box>  
  );
}

export default StaffPage;