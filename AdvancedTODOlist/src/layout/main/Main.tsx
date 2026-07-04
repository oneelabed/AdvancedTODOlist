import { Box } from "@mui/material";
import type { ReactNode } from "react";

function Main({ children }: { children: ReactNode }) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "80vh", // sets page height
        backgroundColor: "#f5f5f5", // background color
        padding: 2,
      }}
    >
      {children}
    </Box>
  );
}

export default Main;
