import {
  Box,
  Button,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router";
import {LuUser, LuLogOut} from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { HiChevronDoubleDown, HiChevronDoubleRight } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { AiOutlineShop } from "react-icons/ai";
import { ReactNode, useState } from "react";
import { useAuthStore } from "@/stores/auth";

interface SidebarButton {
  page: string;
  icon: ReactNode;
  text: string;
}

const sidebarButtons: Array<SidebarButton> = [
  { page: "dashboard", icon: <RxDashboard />, text: "Dashboard" },
  { page: "profile", icon: <LuUser />, text: "Profile" },
  { page: "team", icon: <HiOutlineUserGroup />, text: "Team" },
  { page: "shop", icon: <AiOutlineShop />, text: "Shop" },
];

const MainPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const clearToken = useAuthStore((state) => state.clearToken);

  const sidebar = (
    <Box
      h={{ md: "60vh" }}
      w={{ mdDown: "85vw" }}
      bgColor="red.950"
      borderColor="red.muted"
      borderWidth={2}
      borderRadius={{ base: 30, md: 20 }}
      p={2}
      position="fixed"
      md={{
        maxWidth: sidebarExpanded ? "155px" : "75px",
        minWidth: sidebarExpanded ? "150px" : "70px",
        transition: "max-width 0.3s ease, min-width 0.3s ease-out",
      }}
      justifySelf={{ mdDown: "center" }}
      bottom={{ mdDown: "10px" }}
    >
      <Flex
        direction={{ base: "row", md: "column" }}
        h="full"
        justify="space-between"
      >
        <Flex direction="inherit" align="flex-start" gap={2}>
          <Button
            variant="plain"
            borderRadius="full"
            display={{ base: "none", md: "block" }}
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
          >
            {sidebarExpanded ? (
              <HiChevronDoubleRight />
            ) : (
              <HiChevronDoubleDown />
            )}
          </Button>
          {sidebarButtons.map((button: SidebarButton) => (
            <Button
              variant={pathname.endsWith(button.page) ? "solid" : "outline"}
              borderRadius="full"
              borderWidth={2}
              w={{ md: "full" }}
              justifyContent={{ md: "flex-start" }}
              onClick={() => navigate(`/${button.page}`)}
              size={{ base: "md", mdDown: "lg" }}
            >
              <Text>{button.icon}</Text>
              {sidebarExpanded && (
                <Text display={{ base: "none", md: "inline-block" }}>
                  {button.text}
                </Text>
              )}
            </Button>
          ))}
        </Flex>
        <Button
          variant="ghost"
          borderRadius="full"
          justifyContent="flex-start"
          onClick={() => {
            clearToken();
            navigate("/");
          }}
        >
          <LuLogOut /> {sidebarExpanded && "Logout"}
        </Button>
      </Flex>
    </Box>
  );

  return (
    <Box
      fontFamily="DM Sans"
      overflow="hidden"
      maxWidth="100vw"
      position="relative"
      clipPath="inset(0 0 0 0)"
      minH="100vh"
    >
      <SimpleGrid mt={{ base: "15vh", md: "25vh" }} columns={48}>
        <GridItem
          colSpan={{ base: 44, sm: 34, md: 32, lg: 24 }}
          colStart={{ base: 3, sm: 8, md: 6, lg: 13 }}
        >
          <Outlet />
        </GridItem>
        <GridItem
          colSpan={{ base: 40, md: 1 }}
          colStart={{ base: 5, md: 39, lg: 38 }}
        >
          {sidebar}
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default MainPage;
