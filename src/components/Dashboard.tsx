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
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useTicketAPI } from "../Apis/ticket.API";
import { useEffect, useState } from "react";


const serviceItems = [
  {
    label: "MY OPEN TICKETS",
    value: "4",
    subtext: "Active Requests",
    icon: <ConfirmationNumberIcon sx={{ color: "#fff", fontSize: 26 }} />,
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
    value: "Undefined%",
    subtext: "First Contact Resolution",
    icon: <CheckCircleIcon sx={{ color: "#fff", fontSize: 26 }} />,
    bg: "linear-gradient(135deg, #6366f1, #818cf8)",
  },
  {
    label: "SERVICE RATING",
    value: "Undefined/5",
    subtext: "Your Experience",
    icon: <StarIcon sx={{ color: "#fff", fontSize: 26 }} />,
    bg: "linear-gradient(135deg, #3b82f6, #60a5fa)",
  },
];

type PriorityLevel = "High" | "Medium" | "Critical";
type StatusType = "Open" | "Closed" | "Pending";

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: PriorityLevel;
  status: StatusType;
  updated: string;
}




const renderPriorityChip = (priority: PriorityLevel) => {
  const colorMap: Record<PriorityLevel, string> = {
    High: "#16a34a",
    Medium: "#d97706",
    Critical: "#dc2626",
  }
  return (
    <Chip
      label={priority}
      variant="outlined"
      size="small"
      sx={{
        borderColor: colorMap[priority],
        color: colorMap[priority],
        fontWeight: 500,
        fontSize: 12,
        px: 0.5,
        height: 20,
        borderRadius: 1
      }}
    />
  )
}
const renderStatusChip = (status: StatusType) => {
  return <Chip label={status} color="primary" variant="outlined" size="small"
    sx={{
      fontWeight: 500,
      fontSize: 12,
      px: 0.5,
      height: 20,
      borderRadius: 1
    }}
  />;
};

interface HelpArticle {
  title: string;
  category: string;
  rating: number;
  views: number;
  helpful: number;
}

const articles: HelpArticle[] = [
  {
    title: "How To Connect To VPN",
    category: "Network",
    rating: 4.5,
    views: 245,
    helpful: 23,
  },
  {
    title: "Password Reset Self-Service",
    category: "Security",
    rating: 4.2,
    views: 156,
    helpful: 18,
  },
  {
    title: "Email Setup On Mobile Devices",
    category: "Email",
    rating: 4.7,
    views: 189,
    helpful: 31,
  },
  {
    title: "Software Installation Requests",
    category: "Software",
    rating: 4.1,
    views: 98,
    helpful: 12
  }
]

export default function Dashboard() {
  const { fetchTickets } = useTicketAPI();
  const [tickets, setTickets] = useState([] as any);

  const initiateFetchTickets = async () => {
    try {
      const res = await fetchTickets();
      setTickets(res?.data || []);
      console.log("Fetched Tickets:", res);
    } catch (error) {
      console.log("Error on fetch Tickets", error)
    }
  }
  useEffect(() => {
    initiateFetchTickets();
  }, [fetchTickets])

  function formatDate(timestamp:Date) {
  return new Date(timestamp).toISOString().split("T")[0];
}
  return (
    <Box sx={{ marginRight: 6 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          background: "linear-gradient(90deg, #3b82f6, #22c55e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 1,
          fontSize: 21,
        }}>
        Welcome Back, Alex!
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontSize: 12 }}>
        Manage Your IT Requests And Track Service Status
      </Typography>

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
        }} />

      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, fontSize: 18 }}>
        Service Overview
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
          },
          gap: 3,
          mb: 3,
          width: "100%"
        }}
      >
        {serviceItems.map((item, i) => (
          <Card
            key={i}
            sx={{
              width: "100%",
              height: 120,
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
                  filter:
                    "drop-shadow(0 2px 4px rgba(241, 240, 240, 0.2))",
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
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  {item.label}
                </Typography>
                <Typography variant="h6" sx={{ mt: 0.5 }}>
                  {item.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
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


      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2, p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            Your Active Tickets
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: 'none', fontWeight: "500" }}>
              4 Active
            </Button>

            <Button
              variant="outlined"
              startIcon={<FilterAltIcon />}
              size="small"
              sx={{ textTransform: 'none', fontWeight: 500, color: "black" }}
            >
              Filter
            </Button>
          </Box>
        </Box>
        <Table>
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
            {tickets?.map((ticket:any) => (
              <TableRow key={ticket.id}
                sx={{
                  transition: "background 0.3s",
                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                    transform: "translateY(-2px)",
                    cursor: "pointer"
                  }
                }}>
                <TableCell sx={{ color: "#2563eb", fontWeight: 500 }}>{ticket.TICKET_NO}</TableCell>
                <TableCell>
                  <div style={{ fontWeight: 500 }}>{ticket.TITLE}</div>
                  <div style={{ color: "#6b7280", fontSize: 13 }}>{ticket.DESCRIPTION}</div>
                </TableCell>
                <TableCell>{ticket.CATEGORY}</TableCell>
                <TableCell>{renderPriorityChip(ticket.PRIORITY)}</TableCell>
                <TableCell>{renderStatusChip(ticket.STATUS)}</TableCell>
                <TableCell>{formatDate(ticket.UPDATED_AT)}</TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    sx={{
                      border: "1px solid #e5e7eb",
                      borderRadius: 1,
                      padding: "4px"
                    }}
                  >
                    <RemoveRedEyeOutlinedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mb: 2, pt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          Popular Help Articles
        </Typography>
        <IconButton size="small" sx={{ border: "1px solid #ccc", borderRadius: 1, color: "black" }}>
          <Typography variant="body2" sx={{ mr: 0.5 }}>
            View All
          </Typography>
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap={2}
      >
        {articles.map((article, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 3,
              boxShadow: 1,
              minWidth: 0,
              height: "100%",
              "&:hover": {
                boxShadow: 6,
                color: "#1482dcff"
              }
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
              >
                {article.title}
              </Typography>
              <Box display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {article.category}
                </Typography>
                <Box display="flex">
                  <StarIcon sx={{ color: "#22c55e", fontSize: 18 }} />
                  <Typography variant="body2" fontWeight={500}>
                    {article.rating}
                  </Typography>
                </Box>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center">

                <Typography variant="body2" color="text.secondary">
                  {article.views} Views
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {article.helpful} Helpful
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>


  );
}
