import React from "react";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface MenuToggleProps {
  onClick: () => void;
}

export default function MenuToggle({ onClick }: MenuToggleProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!isSmallScreen) return null;

  return (
    <IconButton
      color="inherit"
      aria-label="open menu"
      onClick={onClick}
      sx={{
        mr: 2,
        boxShadow: 5,
        borderRadius: 2,
        "&:hover": {
          color: "white",
          backgroundColor: "#22c55e",
        },
      }}
    >
      <MenuIcon />
    </IconButton>
  );
}
