import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Box,
  Typography,
  IconButton,
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

const SideBarParent = ({ isCollapsed, toggleSidebar }:any) => {

  const getMenuButtonStyle = (isSignOut:boolean) => ({
    borderRadius: "10px",
    justifyContent: isCollapsed ? "center" : "flex-start",
    px: isCollapsed ? 0 : 2,
    width: "100%",
    "& .MuiListItemText-primary": {
      fontSize: "13px", 
    },
    "&:hover": {
      background: isSignOut
        ? "linear-gradient(90deg, #ef4444, #dc2626)"
        : "linear-gradient(90deg, #3b82f6, #22c55e)",
      color: "white",
      "& .MuiListItemIcon-root": { color: "white" },
    },
  });

  const menuIconStyle = {
    color: "white",
    minWidth: 0,
    mr: isCollapsed ? 0 : 2,
    justifyContent: "center",
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? 60 : 0,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isCollapsed ? 60 : 220,
          boxSizing: "border-box",
          transition: "width 0.3s ease",
          backgroundColor: "#0f1933e4",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box
        sx={{
          p: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
        }}
      >
        {!isCollapsed && (
          <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
            ServiceDesk
          </Typography>
        )}
        <IconButton
          onClick={toggleSidebar}
          sx={{ color: "white" }}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "gray" }} />

      <Box sx={{ flexGrow: 1 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/dashboard"
              sx={getMenuButtonStyle(false)}
              selected={location.pathname === "/dashboard"}
            >
              <ListItemIcon sx={menuIconStyle}>
                <HomeFilledIcon />
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText primary="Dashboard" primaryTypographyProps={{ sx: { fontSize: 13 } }} />
              )}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/tickets"
              sx={getMenuButtonStyle(false)}
              selected={location.pathname === "/tickets"}
            >
              <ListItemIcon sx={menuIconStyle}>
                <ConfirmationNumberIcon />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="My Ticket" />}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/create-ticket"
              sx={getMenuButtonStyle(false)}
            >
              <ListItemIcon sx={menuIconStyle}>
                <AddIcon />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Create Ticket" />}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/self-service" sx={getMenuButtonStyle(false)}>
              <ListItemIcon sx={menuIconStyle}>
                <SearchIcon />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Self Service" />}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/faq" sx={getMenuButtonStyle(false)}>
              <ListItemIcon sx={menuIconStyle}>
                <HelpOutlineIcon />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="FAQ" />}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/assistant" sx={getMenuButtonStyle(false)}>
              <ListItemIcon sx={menuIconStyle}>
                <MessageIcon />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="AI Assistant" />}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        {!isCollapsed && (
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Avatar sx={{ bgcolor: "blue", width: 36, height: 36, fontSize: 14 }}>
              AJ
            </Avatar>
            <Box>
              <Typography variant="body1" sx={{ fontSize: 13, fontWeight: 500 }}>
                Alex Johnson
              </Typography>
              <Typography variant="body2" color="gray" sx={{ fontSize: 11 }}>
                alex.johnson@company.com
              </Typography>
            </Box>
          </Box>
        )}

        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/profile" sx={getMenuButtonStyle(false)}>
              <ListItemIcon sx={menuIconStyle}>
                <PermIdentityIcon />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Profile" />}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton sx={getMenuButtonStyle(true)}>
              <ListItemIcon sx={menuIconStyle}>
                <ExitToAppIcon />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Sign Out" />}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBarParent;
