import React, { useState } from "react";
import { articles } from "../Dashboard";
import { Box } from "@mui/system";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LaunchIcon from "@mui/icons-material/Launch";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { motion } from "framer-motion";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";

const categories = [
  "All",
  "Network",
  "Email",
  "Security",
  "Software",
  "Hardware",
  "Mobile",
];

const SelfKnowledgeBase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;

    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });
  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", minHeight: "100vh" }}>
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          mt: 3,
        }}
      >
        {/* Title */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <MenuBookOutlinedIcon
            sx={{ color: "#2563eb", fontSize: 22, mr: 1 }}
          />
          <Typography
            sx={{ fontWeight: 600, fontSize: "16px", color: "#111827" }}
          >
            Knowledge Base
          </Typography>
        </Box>

        {/* Search + Categories */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            borderBottom: "2px solid rgba(0,0,0,0.1)",
            // borderLeft: "2px solid rgba(0,0,0,0.1)",
            // borderRight: "2px solid rgba(0,0,0,0.1)",
            p: 2,
            py: 3,
          }}
        >
          {/* Search bar */}
          <TextField
            placeholder="Search Knowledge base"
            variant="outlined"
            size="small"
            // fullWidth
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              flexGrow: 1,
              maxWidth: 500,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                height: 42,
                fontSize: "13px",
                // paddingRight:"20px",
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-input": {
                  // padding: "10px 12px",
                  // paddingRight:"20px"
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: "#6b7280" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Categories */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "contained" : "outlined"}
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  textTransform: "none",
                  fontSize: "11px",
                  fontWeight: 600,
                  borderRadius: "8px",
                  px: 1.5,
                  py: 0.2,
                  minHeight: 32,
                  // lineHeight: 1.2,
                  boxShadow: "none",
                  backgroundColor:
                    selectedCategory === cat ? "#2563eb" : "#fff",
                  color: selectedCategory === cat ? "#fff" : "#1f2937",
                  borderColor: "#e5e7eb",
                  "&:hover": {
                    backgroundColor:
                      selectedCategory === cat ? "#2563eb" : "#43d36b",
                    color: "#fff",
                    borderColor: "#d1d5db",
                  },
                }}
              >
                {cat}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Articles Section */}
      <Box sx={{ mt: 4 }}>
        {filteredArticles.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 3,
            }}
          >
            {filteredArticles.map((article, index) => (
              <Box
                key={index}
                sx={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  p: 3,
                  backgroundColor: "#fff",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                    transform: "translateY(-4px)",
                    borderColor: "transparent",
                  },
                }}
              >
                {/* Title + Category */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "#111827",
                        mb: 1,
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Typography
                      sx={{
                        display: "inline-block",
                        fontSize: "11px",
                        fontWeight: 500,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "8px",
                        backgroundColor: "#f3f4f6",
                        color: "#374151",
                      }}
                    >
                      {article.category}
                    </Typography>
                  </Box>

                  {/* External Link Icon */}
                  <Box>
                    <LaunchIcon sx={{ fontSize: 14, color: "#6b7280" }} />
                  </Box>
                </Box>

                {/* Description */}
                <Typography
                  sx={{ fontSize: "12px", color: "#6b7280", mt: 5, mb: 2 }}
                >
                  Hi, hello how are you
                </Typography>

                {/* Stats (views, rating, likes) */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <VisibilityIcon sx={{ fontSize: 12, color: "#6b7280" }} />
                    <Typography sx={{ fontSize: "11px", color: "#6b7280" }}>
                      {article.views}
                    </Typography>
                    <StarIcon sx={{ fontSize: 12, color: "#f59e0b" }} />
                    <Typography sx={{ fontSize: "11px", color: "#6b7280" }}>
                      {article.rating}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={0.5}>
                    <ThumbUpAltIcon sx={{ fontSize: 12, color: "#6b7280" }} />
                    <Typography sx={{ fontSize: "11px", color: "#6b7280" }}>
                      {article.helpful}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Box
              sx={{
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                p: 3,
                mt: 1,
                textAlign: "center",
                backgroundColor: "#fff",
                boxShadow: 3,
              }}
            >
              <MenuBookOutlinedIcon
                sx={{ fontSize: 40, color: "#d1d5db", mb: 1 }}
              />
              <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
                No Articles Found
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "#6b7280", mb: 2 }}>
                We couldn't find any articles matching your search criteria. Try
                adjusting your search terms or selecting a different category.
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "13px",
                  color: "#000",
                  px: 2,
                }}
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </Box>
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default SelfKnowledgeBase;
