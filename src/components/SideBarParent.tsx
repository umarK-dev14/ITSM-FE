import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  IconButton,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MessageIcon from "@mui/icons-material/Message";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useLocation } from "react-router-dom";

interface SideBarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const drawerWidth = 220;

export default function SideBarParent({ isCollapsed, toggleSidebar }: SideBarProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();


  const getMenuButtonStyle = (isSignOut = false) => ({
    borderRadius: "10px",
    justifyContent: isCollapsed ? "center" : "flex-start",
    px: isCollapsed ? 0 : 2,
    width: "100%",
    "& .MuiListItemText-primary": { fontSize: 13 },
    "&:hover": {
      background: isSignOut
        ? "linear-gradient(90deg, #ef4444, #dc2626)"
        : "linear-gradient(90deg, #3b82f6, #22c55e)",
      color: "white",
      "& .MuiListItemIcon-root": { color: "white" },
    },
  });

  const menuIconStyle = { color: "white", minWidth: 0, mr: isCollapsed ? 0 : 2, justifyContent: "center" };

const drawerContent = (
  <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: isCollapsed ? "center" : "space-between",
      }}
    >

      {!isCollapsed && (
        <Box display="flex" alignItems="center" gap={1}>
          <ConfirmationNumberIcon
            sx={{
              color: "white",
              backgroundColor: "#3b82f6",
              borderRadius: "6px",
              padding: "4px",
              fontSize: 20, 
            }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "white", fontSize: 15 }}>
            ServiceDesk
          </Typography>
        </Box>
      )}

      <IconButton onClick={toggleSidebar} sx={{ color: "white" }}>
        {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </Box>


      <Divider sx={{ borderColor: "gray" }} />

      <Box sx={{ flexGrow: 1 }}>
        <List>
          {[
            { text: "Dashboard", icon: <HomeFilledIcon />, to: "/dashboard" },
            { text: "My Tickets", icon: <ConfirmationNumberIcon />, to: "/tickets" },
            { text: "Create Ticket", icon: <AddIcon />, to: "/create-ticket" },
            { text: "Self Service", icon: <SearchIcon />, to: "/self-service" },
            { text: "FAQ", icon: <HelpOutlineIcon />, to: "/faq" },
            { text: "AI Assistant", icon: <MessageIcon />, to: "/assistant" },
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.to}
                selected={location.pathname === item.to}
                sx={getMenuButtonStyle(false)}
              >
                <ListItemIcon sx={menuIconStyle}>{item.icon}</ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 1, mb: 1 }}>
        {!isCollapsed && (
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Avatar sx={{ bgcolor: "blue", width: 32, height: 32, fontSize: 12 }}>AJ</Avatar>
            <Box>
              <Typography variant="body1" sx={{ fontSize: 12, fontWeight: 100 }}>
                Alex Johnson
              </Typography>
              <Typography variant="body2" color="gray" sx={{ fontSize: 12 }}>
                alex.johnson@company.com
              </Typography>
            </Box>
          </Box>
        )}

        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/profile" sx={getMenuButtonStyle(false)}>
              <ListItemIcon sx={{...menuIconStyle, fontSize: 11}}>
                <PermIdentityIcon sx={{fontSize: 16}} />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Profile"/>}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton sx={getMenuButtonStyle(true)}>
              <ListItemIcon sx={{...menuIconStyle, fontSize: 11}}>
                <ExitToAppIcon sx={{fontSize: 15}} />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Sign Out" />}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {isSmallScreen ? (
        <Drawer
          variant="temporary"
          open={!isCollapsed}
          onClose={toggleSidebar}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#0f1933e4",
              color: "white",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: isCollapsed ? 60 : drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: isCollapsed ? 60 : drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#0f1933e4",
              color: "white",
              transition: "width 0.3s ease",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
