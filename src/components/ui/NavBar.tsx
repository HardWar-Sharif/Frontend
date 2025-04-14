import { useAuthStore } from "@/stores/auth";
import {
  Button,
  Box,
  Text,
  BoxProps,
  Link,
  Flex,
  Stack,
  Image,
  ButtonProps,
} from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";
import { useState, ReactNode } from "react";
import { NavLink, useNavigate } from "react-router";

const handleScroll = (id: string) => {
  if (id == "") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  }
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.offsetTop - 100;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};

const Logo: React.FC<BoxProps> = (props) => {
  const navigate = useNavigate();

  return (
    <Box {...props} onClick={() => navigate("/")}>
      <Image src="hardwar.svg" />
    </Box>
  );
};

const CloseIcon = () => {
  return <Image src="navbar/close.png" w="40px" cursor="pointer" />;
};

const MenuIcon = () => {
  return <Image src="navbar/menu.png" w="40px" cursor="pointer" />;
};

type MenuToggleProps = {
  toggle: () => void;
  isOpen: boolean;
};

const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({
  children,
  to = "",
  ...rest
}: {
  children: ReactNode;
  to?: string;
}) => {
  return (
    <Link
      href={"#" + to}
      onClick={(e) => {
        e.preventDefault();
        handleScroll(to);
      }}
    >
      <Text display="block" {...rest} color="white">
        {children}
      </Text>
    </Link>
  );
};

const MenuButton = ({
  children,
  to = "/",
  ...props
}: { children: ReactNode; to?: string } & ButtonProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box display={{ base: "block", md: "none" }}>
        <NavLink to={to}>
          <Text display="block">{children}</Text>
        </NavLink>
      </Box>
      <Box display={{ base: "none", md: "block" }}>
        <Button
          rounded="full"
          height="56px"
          width="125px"
          fontSize="md"
          fontFamily="DM Sans"
          fontWeight="bold"
          borderWidth="2px"
          onClick={() => navigate(to)}
          {...props}
        >
          {children}
        </Button>
      </Box>
    </Box>
  );
};

const MenuLinks = ({ isOpen, ...props }: { isOpen: boolean }) => {
  const navigate = useNavigate();
  const { t } = useTranslate();
  const tokenIsValid = useAuthStore((state) => state.isValid);
  const clearToken = useAuthStore((state) => state.clearToken);

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "flex" }} // Use flex for horizontal layout
      flexBasis={{ base: "100%", md: "auto" }}
      justifyContent="space-between" // Space between MenuItems and Button
      alignItems="center" // Align items vertically in the center
      flexGrow={1}
    >
      <Stack
        align="center"
        justify={["center", "space-between", "flex-start", "flex-start"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
        gap={{ base: "2", md: "6" }}
      >
        <MenuItem to="about" {...props}>
          {t("navbar.about")}
        </MenuItem>
        <MenuItem to="timeline" {...props}>
          {t("navbar.timeline")}
        </MenuItem>
        <MenuItem to="honors" {...props}>
          {t("navbar.honors")}
        </MenuItem>
        <MenuItem to="contact" {...props}>
          {t("navbar.contact")}
        </MenuItem>
      </Stack>
      <Stack
        align="center"
        justify={["center", "space-between", "flex-start", "flex-start"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
        gap={{ base: "2", md: "6" }}
      >
        {tokenIsValid() ? (
          <>
            <MenuButton
              to="/"
              variant="outline"
              borderColor="colorPalette.600"
              onClick={() => {
                clearToken();
                navigate("/");
              }}
            >
              Logout
            </MenuButton>
            <MenuButton to="/dashboard">Dashboard</MenuButton>
          </>
        ) : (
          <>
            <MenuButton
              to="/login"
              variant="outline"
              borderColor="colorPalette.600"
            >
              {t("navbar.signin")}
            </MenuButton>
            <MenuButton to="/signup">{t("navbar.signup")}</MenuButton>
          </>
        )}
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["primary.500", "primary.500", "primary.500", "primary.500"]}
      color={["white", "white", "primary.700", "primary.700"]}
      padding="1.5% 10% 0.75% 10%"
      {...props}
    >
      {children}
    </Flex>
  );
};

const NavBar: React.FC<BoxProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Box display="flex" alignContent="center">
        <Logo
          w="80px"
          color={["white", "white", "primary.500", "primary.500"]}
          onClick={(e) => {
            e.preventDefault();
            handleScroll("");
          }}
          cursor="pointer"
          _hover={{
            opacity: 0.8,
          }}
        />
        <Box
          h="70px"
          w="1px"
          bg="red.600"
          mx={4}
          display={{ base: "none", md: "block" }}
        />
      </Box>

      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

export default NavBar;
