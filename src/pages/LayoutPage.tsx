import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material"
import SideBarParent from "../components/SideBarParent";
import HeaderParent from "../components/HeaderParent";

export default function Layout({ children }: any) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed((s) => !s);
  const sidebarWidth = isCollapsed ? 60 : 220;

  return (
    <Box sx={{ display: "flex" }}>
      <SideBarParent isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <HeaderParent isCollapsed={isCollapsed} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          ml: `${sidebarWidth}px`, 
          transition: "margin 0.3s ease",
        }}
      >
        <Toolbar sx={{minHeight: 64}} />
        {children}
      </Box>
    </Box>
  );
}
