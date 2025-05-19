import { useAuthStore } from "@/stores/auth";
import { useLanguageStore } from "@/stores/language";
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
  Menu,
  Portal,
} from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";
import { useState, ReactNode, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router";
import { CiGlobe } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

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

type MenuToggleProps = {
  toggle: () => void;
  isOpen: boolean;
};

const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? (
        <RxCross2 size="32px" cursor="pointer" />
      ) : (
        <RxHamburgerMenu size="32px" cursor="pointer" />
      )}
    </Box>
  );
};

const MenuItem = ({
  children,
  to = "",
  onNavigate,
  ...rest
}: {
  children: ReactNode;
  to?: string;
  onNavigate?: () => void;
}) => {
  return (
    <Link
      href={"#" + to}
      onClick={(e) => {
        e.preventDefault();
        handleScroll(to);
        if (onNavigate) onNavigate();
      }}
      _focus={{ boxShadow: "none", outline: "none" }}
    >
      <Text display="block" {...rest} color="white" fontWeight="bold">
        {children}
      </Text>
    </Link>
  );
};

const MenuButton = ({
  children,
  to = "/",
  onNavigate,
  ...props
}: {
  children: ReactNode;
  to?: string;
  onNavigate?: () => void;
} & ButtonProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box display={{ base: "block", md: "none" }} onClick={onNavigate}>
        <NavLink to={to}>
          <Text display="block">{children}</Text>
        </NavLink>
      </Box>
      <Box display={{ base: "none", md: "block" }}>
        <Button
          size="lg"
          rounded="full"
          fontSize="md"
          fontWeight="bold"
          borderWidth="2px"
          onClick={() => {
            navigate(to);
            if (onNavigate) onNavigate();
          }}
          {...props}
        >
          {children}
        </Button>
      </Box>
    </Box>
  );
};

const LanguageSwitch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const languages = [
    { label: "فارسی", value: "fa" },
    { label: "English", value: "en" },
  ];
  const inputStyles = {
    borderWidth: 1,
    borderColor: "red.muted",
    bgColor: "red.950",
    focusRingColor: "bg",
    color: "red.50",
    _invalid: { bgColor: "red.muted" },
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          rounded="full"
          onClick={() => setIsOpen(!isOpen)}
          _focus={{ boxShadow: "none", outline: "none" }}
        >
          <CiGlobe />
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="5rem" {...inputStyles}>
            <Menu.RadioItemGroup
              value={language}
              onValueChange={(e) => setLanguage(e.value == "en" ? "en" : "fa")}
            >
              {languages.map((lang) => (
                <Menu.RadioItem
                  key={lang.value}
                  value={lang.value}
                  _hover={{ bgColor: "red.muted" }}
                  _selected={{ bgColor: "red.muted" }}
                >
                  {lang.label}
                  <Menu.ItemIndicator />
                </Menu.RadioItem>
              ))}
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

const MenuLinks = ({
  isOpen,
  closeMenu,
  ...props
}: {
  isOpen: boolean;
  closeMenu: () => void;
}) => {
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
        gap={{ base: "1", md: "6" }}
      >
        <MenuItem to="timeline" onNavigate={closeMenu} {...props}>
          {t("navbar.timeline")}
        </MenuItem>
        <MenuItem to="about" onNavigate={closeMenu} {...props}>
          {t("navbar.about")}
        </MenuItem>
        <MenuItem to="contact" onNavigate={closeMenu} {...props}>
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
        <LanguageSwitch />
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
              {t("label.logout")}
            </MenuButton>
            <MenuButton to="/dashboard" onNavigate={closeMenu}>
              {t("label.dashboard")}
            </MenuButton>
          </>
        ) : (
          <>
            <MenuButton
              to="/login"
              variant="outline"
              borderColor="colorPalette.600"
              onNavigate={closeMenu}
            >
              {t("label.login")}
            </MenuButton>
            <MenuButton to="/signup" onNavigate={closeMenu}>
              {t("label.signup")}
            </MenuButton>
          </>
        )}
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({
  children,
  isScrolled = false,
  ...props
}: {
  children: ReactNode;
  isScrolled?: boolean;
}) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={0}
      padding="15px 10% 8px 10%"
      top="0"
      left="0"
      bg={
        isScrolled
          ? "rgba(10, 10, 10, 0.45)" // translucent white
          : "black"
      }
      color={
        isScrolled
          ? "primary.700"
          : ["white", "white", "primary.700", "primary.700"]
      }
      boxShadow={isScrolled ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none"}
      backdropFilter={isScrolled ? "saturate(200%) blur(20px)" : "none"}
      borderBottom="1.5px solid"
      borderColor={isScrolled ? "rgba(255, 100, 100, 0.2)" : "transparent"}
      transition="all 0.3s ease, border-color 0.15s ease"
      {...props}
    >
      {children}
    </Flex>
  );
};

const NavBar: React.FC<BoxProps> = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Box ref={navRef}>
      <NavBarContainer isScrolled={isScrolled} {...props}>
        <Box display="flex" alignContent="center">
          <Link
            href={"#hardwar"}
            onClick={(e) => {
              e.preventDefault();
              handleScroll("hardwar");
            }}
            _focus={{ boxShadow: "none", outline: "none" }}
          >
            <Logo
              w="60px"
              color={["white", "white", "primary.500", "primary.500"]}
              cursor="pointer"
              _hover={{
                opacity: 0.8,
              }}
            />
          </Link>
          <Box
            h="50px"
            w="1px"
            bg="red.600"
            mx={4}
            display={{ base: "none", md: "block" }}
          />
        </Box>

        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} closeMenu={() => setIsOpen(false)} />
      </NavBarContainer>
    </Box>
  );
};

export default NavBar;
