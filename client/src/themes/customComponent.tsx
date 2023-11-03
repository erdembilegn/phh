import {
    Button,
    Input,
    MenuList,
    chakra,
    Flex,
    Text,
    TableContainer,
  } from "@chakra-ui/react";
  
  export const FormInput = chakra(Input, {
    baseStyle: {
      color: "loginFormPlace",
      _placeholder: {
        color: "loginFormPlace",
      },
      borderBottom: "4px solid",
      p: "12px",
    },
  });
  
  export const Submit = chakra(Button, {
    baseStyle: {
      w: "40%",
      fontSize: "md",
      p: "1.5rem",
      bg: "loginSubmit",
      rounded: "xl",
      color: "white",
      _hover: {
        backgroundColor: "#3D6CB9",
        color: "gray.300",
      },
    },
  });
  
  export const Form = chakra("form", {
    baseStyle: {
      w: "100%",
      h: "100%",
      display: "grid",
      justifyContent: "center",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateRows: "1fr 5rem 5rem 1fr",
      gridTemplateColumns: "65%",
    },
  });
  
  export const Logout = chakra(MenuList, {
    baseStyle: {
      border: "none",
      shadow: "2xl",
      bg: "white",
      boxShadow: "1px 11px 8px -1px rgba(74,62,62,0.75);",
      minW: "0",
      w: "5rem",
    },
  });
  
  export const HeaderContainer = chakra(Flex, {
    baseStyle: {
      w: "100%",
      border: "1px solid #f2f2f2",
      align: "center",
      px: "2rem",
    },
  });
  
  export const SideBtn = chakra(Button, {
    baseStyle: {
      _active: { bg: "mainBackground", color: "mainColor" },
      bg: "white",
      w: "100%",
      h: "6%",
      rounded: "none",
    },
  });
  
  export const TextHeader = chakra(Text, {
    baseStyle: {
      color: "mainColor",
      fontWeight: "extrabold",
    },
  });
  
  export const InputStyle = chakra(Input, {
    baseStyle: {
      bg: "white",
    },
  });
  
  
  export const SearchInput = chakra(Input, {
      baseStyle: {
          bg: "white",
      }
  })
  
  export const ExtendedTableContainer = chakra(TableContainer, {
      baseStyle: {
        mt: "1rem",
        border: "none",
        "&::-webkit-scrollbar": {
          width: "6px",
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#a7c957",
        },
        w: "95%",
        position: "relative",
        bottom: "25px"
      },
    });
  
    export const PopButton = chakra(Button, {
      baseStyle: {
        bg: "inherit",
        _hover: {
          bg: "inherit"
        },
        _disabled: {
          bg: "inherit",
          _hover: {
            bg: "inherit"
          }
        }
      }
    })