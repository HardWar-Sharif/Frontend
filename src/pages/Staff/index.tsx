import { Box, Stack, Flex } from "@chakra-ui/react"
import Footer from "../Landing/Footer";
import StaffSection from "./StaffSection";
import { useEffect, useState } from "react";

interface Member {
  name: string;
  subtitle: string;
  image: string;
}

interface Team {
  team: string;
  members: Member[];
}

type StaffData = Team[];

const StaffPage = () => {
  const [staff, setStaff] = useState<StaffData | null>(null);

  useEffect(() => {
    fetch('staff/all-staff.json')
      .then((response) => response.json())
      .then((data: StaffData) => setStaff(data))
      .catch((error) => console.error('Error loading JSON file:', error));
  }, []);

  if (!staff) {
    return <div>Loading...</div>;
  }

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