import Header from "./Header";
import { ThemeProvider, theme, CSSReset, Box } from "@chakra-ui/core";

const Layout = Page => {
  return () => (
    <Box p={4} border="1px" borderColor="gray.200">
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Header />
        <Page />
      </ThemeProvider>
    </Box>
  );
};
export default Layout;
