import {
  Typography,
  TextField,
  Box,
  Card,
  CardContent,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star" ;
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useTicketAPI } from "../Apis/ticket.API";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type PriorityLevel = "High" | "Medium" | "Medium-Low" | "Critical" | "Low";
type StatusType = "Open" | "Closed" | "Pending";

const renderPriorityChip = (priority: PriorityLevel) => {
  const colorMap: Record<PriorityLevel, string> = {
    High: "#e8360de1",
    Medium: "#d97706",
    "Medium-Low": "#ffc908ff",
    Critical: "#f00a0aff",
    Low: "#16a34a",
  };

  return (
    <Chip
      label={priority}
      variant="outlined"
      size="small"
      sx={{
        borderColor: colorMap[priority],
        color: colorMap[priority],
        fontWeight: 500,
        fontSize: 11,
        px: 0,
        height: 20,
        borderRadius: 1,
      }}
    />
  );
};

const renderStatusChip = (status: StatusType) => {
  return (
    <Chip
      label={status}
      color="primary"
      variant="outlined"
      size="small"
      sx={{
        fontWeight: 500,
        fontSize: 11,
        px: 0,
        height: 20,
        borderRadius: 1,
      }}
    />
  );
};

interface HelpArticle {
  title: string;
  category: string;
  description: string;
  rating: number;
  views: number;
  helpful: number;
}

export const articles: HelpArticle[] = [
  {
    title: "How To Connect To VPN",
    category: "Network",
    description: "Step-by-step guide to connect to the company VPN...",
    rating: 4.5,
    views: 245,
    helpful: 23,
  },
  {
    title: "Password Reset Self-Service",
    category: "Security",
    description: "Learn how to reset your password without contacting IT...",
    rating: 4.2,
    views: 156,
    helpful: 18,
  },
  {
    title: "Email Setup On Mobile Devices",
    category: "Email",
    description: "Configure your work email on iPhone and Android devices...",
    rating: 4.7,
    views: 189,
    helpful: 31,
  },
  {
    title: "Software Installation Requests",
    category: "Software",
    description: "How to request software installation and what is approved...",
    rating: 4.1,
    views: 98,
    helpful: 12,
  },
  //  {
  //   title: "Software Installation Requests",
  //   category: "Software",
  //   description: "How to request software installation and what is approved....",
  //   rating: 4.1,
  //   views: 98,
  //   helpful: 12,
  // },
  //   {
  //   title: "How To Connect To VPN",
  //   category: "Network",
  //   description: "Step-by-step guide to connect to the company VPN...",
  //   rating: 4.5,
  //   views: 245,
  //   helpful: 23,
  // },
];

export default function Dashboard() {
  const { fetchTickets } = useTicketAPI();
  const [tickets, setTickets] = useState([] as any);

  const navigate = useNavigate()

  const initiateFetchTickets = async () => {
    try {
      const res = await fetchTickets();
      setTickets(res?.data || []);
      console.log("Fetched Tickets:", res);
    } catch (error) {
      console.log("Error on fetch Tickets", error);
    }
  };
  useEffect(() => {
    initiateFetchTickets();
  }, [fetchTickets]);

  function formatDate(timestamp: Date) {
    return new Date(timestamp).toISOString().split("T")[0];
  }
  const filteredTickets = tickets?.filter(
    (ticket: any) => ticket.STATUS === "open"
  );
  const serviceItems = [
    {
      label: "MY OPEN TICKETS",
      value: filteredTickets?.length,
      subtext: "Active Requests",
      icon: (
        <ConfirmationNumberOutlinedIcon sx={{ color: "#fff", fontSize: 26 }} />
      ),
      bg: "linear-gradient(135deg, #3b82f6, #22c55e)",
    },
    {
      label: "AVG RESPONSE TIME",
      value: "—",
      subtext: "Support Response",
      icon: <AccessTimeIcon sx={{ color: "#fff", fontSize: 26 }} />,
      bg: "linear-gradient(135deg, #34d399, #10b981)",
    },
    {
      label: "RESOLUTION RATE",
      value: "—",
      subtext: "First Contact Resolution",
      icon: <TaskAltOutlinedIcon sx={{ color: "#fff", fontSize: 26 }} />,
      bg: "linear-gradient(135deg, #6366f1, #818cf8)",
    },
    {
      label: "SERVICE RATING",
      value: "—",
      subtext: "Your Experience",
      icon: <StarBorderOutlinedIcon sx={{ color: "#fff", fontSize: 26 }} />,
      bg: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    },
  ];

  return (
    <Container maxWidth={false} disableGutters>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          background: "linear-gradient(90deg, #3b82f6, #22c55e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 1,
          mt: 3,
          fontSize: 21,
        }}
      >
        Welcome Back, Alex!
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 2, fontSize: 12 }}
      >
        Manage Your IT Requests And Track Service Status
      </Typography>

      {/* Search Bar */}
      <TextField
        placeholder="Search Tickets, Knowledge Base, Or Services..."
        variant="outlined"
        size="small"
        sx={{
          width: 500,
          mb: 3,
          background: "white",
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            height: 37,
            padding: 1,
          },
          "& .MuiOutlinedInput-input": {
            fontSize: 13,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />

      {/* Service Overview Cards */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, fontSize: 18 }}>
        Service Overview
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 3,
          width: "100%",
        }}
      >
        {serviceItems.map((item, i) => (
          <Card
            key={i}
            sx={{
              width: "100%",
              minHeight: 120,
              borderRadius: 3,
              boxShadow: 2,
              display: "flex",
              alignItems: "center",
              transition: "box-shadow 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                boxShadow: 6,
                "& .iconWrapper": {
                  transform: "scale(1.1)",
                  filter: "drop-shadow(0 2px 4px rgba(241, 240, 240, 0.2))",
                },
                "& .iconWrapper svg": {
                  filter: "none",
                  color: "none",
                },
              },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "100%",
                py: 2,
                px: 2,
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                  fontSize={12}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mt: 0.5,
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#0F172A",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.value}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: 11,
                    color: "#94A3B8",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {item.subtext}
                </Typography>
              </Box>

              <Box
                className="iconWrapper"
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition:
                    "background 0.3s ease, filter 0.3s ease, transform 0.3s ease",
                }}
              >
                {item.icon}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Active Tickets Table */}
      <Paper
        sx={{
          borderRadius: 3,
          boxShadow: 2,
          p: 2,
          "&:hover": { boxShadow: 6 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 1, fontSize: 18 }}
          >
            Your Active Tickets
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
                fontWeight: "500",
                bgcolor: "#3c6cfc",
                borderRadius: 2,
                fontSize:"12px"
              }}
            >
              {tickets.length} Active
            </Button>

            <Button
              variant="outlined"
              startIcon={<FilterAltIcon />}
              size="small"
              sx={{ textTransform: "none", fontWeight: 500, color: "black" }}
            >
              Filter
            </Button>
          </Box>
        </Box>

        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f9fafb" }}>
              <TableCell>
                <strong>Ticket ID</strong>
              </TableCell>
              <TableCell>
                <strong>Title & Description</strong>
              </TableCell>
              <TableCell>
                <strong>Category</strong>
              </TableCell>
              <TableCell>
                <strong>Priority</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Last Updated</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets?.map((ticket: any) => (
              <TableRow
                key={ticket.id}
                sx={{
                  transition: "background 0.3s",
                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                    transform: "translateY(-2px)",
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell
                  sx={{ color: "#2563eb", fontWeight: 500, fontSize: 12 }}
                >
                  {ticket.TICKET_NO}
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" fontSize={13}>
                      {ticket.TITLE}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: 12 }}
                    >
                      {ticket.DESCRIPTION.length > 20
                        ? ticket.DESCRIPTION.substring(0, 20) + "..."
                        : ticket.DESCRIPTION}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: 13 }}>{ticket.CATEGORY}</TableCell>
                <TableCell>{renderPriorityChip(ticket.PRIORITY)}</TableCell>
                <TableCell>{renderStatusChip(ticket.STATUS)}</TableCell>
                <TableCell sx={{ fontSize: 13 }}>
                  {formatDate(ticket.UPDATED_AT)}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    sx={{
                      border: "1px solid #e5e7eb",
                      borderRadius: 1,
                      padding: "4px",
                    }}
                  >
                    <RemoveRedEyeOutlinedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Popular Help Articles */}
      <Box
        sx={{
          mb: 2,
          pt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: 18 }}>
          Popular Help Articles
        </Typography>
        <IconButton
          size="small"
          onClick={() => navigate("/self-service")}
          sx={{ border: "1px solid #ccc", borderRadius: 2, color: "black" }}
        >
          <Typography variant="body2" sx={{ mr: 0.5, fontSize: "13px" }}>
            View All
          </Typography>
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "1fr 1fr",
          md: "repeat(4, 1fr)",
        }}
        gap={2}
      >
        {articles.map((article, index) => (
          <Card
            key={index}
            onClick={()=> navigate("/self-service")}
            sx={{
              borderRadius: 3,
              boxShadow: 1,
              minWidth: 0,
              height: "100%",
              "&:hover": {
                boxShadow: 6,
                color: "#3c6cfc",
              },
              cursor:"pointer"
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                fontSize={14}
                gutterBottom
              >
                {article.title}
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color="text.secondary"
                  fontSize={12}
                  sx={{ mb: 1 }}
                >
                  {article.category}
                </Typography>
                <Box display="flex">
                  <StarIcon sx={{ color: "#47d16a", fontSize: 13 }} />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    fontSize={10}
                    sx={{ color: "#47d16a" }}
                  >
                    {article.rating}
                  </Typography>
                </Box>
              </Box>  

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize={12}
                >
                  {article.views} Views
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize={12}
                >
                  {article.helpful} Helpful
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
