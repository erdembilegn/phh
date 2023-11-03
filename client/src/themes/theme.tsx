
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const theme = extendTheme({ 
  config,
  colors: {
    loginFormPlace: "#6d6d6d",
    loginHeader: "#30804b",
    loginSubmit: "#317334",
    loginForm: "RGBA(0, 0, 0, 0.10)",
    headerRole: "#4D4D4D",
    personalHeader: "#386641",
    mainBackground: "#a7c957",
    mainColor: "#16400c"
  },
  sizes: {
    icon: "44px",
  }
})

export default theme

