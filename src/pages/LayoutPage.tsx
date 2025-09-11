import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import SideBarParent from "../components/SideBarParent";
import HeaderParent from "../components/HeaderParent";


export default function Layout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const sidebarWidth = isCollapsed ? 0 : 0;

  return (
    <Box sx={{ display: "flex" }}>
      <SideBarParent isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <HeaderParent isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: 1,
          ml: { xs: 0, sm: `${sidebarWidth}px` },
          transition: "margin 0.3s ease",
        }}
      >
        <Toolbar sx={{ minHeight: 64 }} />
        {children}
      </Box>
    </Box>
  );
}
