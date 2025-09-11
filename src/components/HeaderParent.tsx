import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AddIcon from "@mui/icons-material/Add";
import { useLocation } from "react-router-dom";
import MenuToggle from "./MenuToggle";

interface HeaderParentProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function HeaderParent({
  isCollapsed,
  toggleSidebar,
}: HeaderParentProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/tickets": "My Tickets",
    "/create-ticket": "Create Ticket",
    "/create-ticket/requesttype": "Create Ticket",
    "/create-ticket/category": "Create Ticket",
    "/create-ticket/ticketdetails": "Create Ticket",
    "/self-service": "Self Service",
    "/faq": "FAQ",
    "/assistant": "AI Assistant",
    "/profile": "Profile",
  };

  const title = pageTitles[location.pathname] || "ServiceDesk";
  const sidebarWidth = isCollapsed ? 50 : 220;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        ml: isSmallScreen ? 0 : `${sidebarWidth}px`,
        width: isSmallScreen ? "100%" : `calc(100% - ${sidebarWidth}px)`,
        backgroundColor: "white",
        color: "black",
        borderBottom: "1px solid #e5e7eb",
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 67,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          {isSmallScreen && <MenuToggle onClick={toggleSidebar} />}

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
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          {isSmallScreen ? (
            <>
              <IconButton
                sx={{
                  color: "black",
                  borderRadius: 2,
                  boxShadow: 1,
                  border: 1,
                }}
              >
                <NotificationsNoneIcon />
              </IconButton>
              <IconButton
                sx={{
                  background: "linear-gradient(90deg, #3b82f6, #22c55e)",
                  color: "white",
                  borderRadius: 2,
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
                  "&:hover": { opacity: 0.9 },
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
