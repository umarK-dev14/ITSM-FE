import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AddIcon from "@mui/icons-material/Add";
import { useLocation } from "react-router-dom";

export default function HeaderParent({ isCollapsed }: { isCollapsed: boolean }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  type RouteKeys =
    | "/dashboard"
    | "/tickets"
    | "/create-ticket"
    | "/self-service"
    | "/faq"
    | "/assistant"
    | "/profile";

  const pageTitles: Record<RouteKeys, string> = {
    "/dashboard": "Dashboard",
    "/tickets": "My Tickets",
    "/create-ticket": "Create Ticket",
    "/self-service": "Self Service",
    "/faq": "FAQ",
    "/assistant": "AI Assistant",
    "/profile": "Profile",
  };

  const title =
    pageTitles[location.pathname as RouteKeys] || "ServiceDesk";

  const sidebarWidth = isCollapsed ? 60 : 220;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        ml: `${sidebarWidth}px`,
        width: `calc(100% - ${sidebarWidth}px)`,
        backgroundColor: "white",
        color: "black",
        borderBottom: "1px solid #e5e7eb",
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 64,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#111827", fontSize: "22px" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "gray", fontSize: "13px", mt: 0.5 }}
          >
            Welcome back, Alex
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          {isSmallScreen ? (
            <>
              <IconButton sx={{ color: "black" }}>
                <NotificationsNoneIcon />
              </IconButton>
              <IconButton
                sx={{
                  background: "linear-gradient(90deg, #3b82f6, #22c55e)",
                  color: "white",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                <AddIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                startIcon={<NotificationsNoneIcon />}
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  borderColor: "#e5e7eb",
                  color: "black",
                  backgroundColor: "white",
                  "&:hover": {
                    borderColor: "#d1d5db",
                    backgroundColor: "#f9fafb",
                  },
                }}
              >
                Notifications
              </Button>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  background: "linear-gradient(90deg, #3b82f6, #22c55e)",
                  color: "white",
                  fontWeight: 500,
                }}
              >
                New Ticket
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
