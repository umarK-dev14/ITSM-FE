import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  CheckCircle,
  WarningAmber,
  Visibility,
  TrendingUp,
  ConfirmationNumberOutlined,
  FilterAltOutlined,
  Search,
  AccessTime,
  ErrorOutline,
  Bolt,
  Close,
} from "@mui/icons-material";
import { useTicketAPI } from "../Apis/ticket.API";
import { useEffect, useMemo, useState } from "react";

//Ticket type from API
type Ticket = {
  ID: number;
  TICKET_NO: string;
  TITLE: string;
  DESCRIPTION: string;
  STATUS: string;
  REQUESTOR: string;
  ASSIGNEE: string;
  TYPE: string;
  CATEGORY: string;
  CREATED_AT: string;
  DUE_AT: string | null;
  CLOSED_AT: string | null;
  SLA_STATUS: string | null;
  PRIORITY: string;
};

//Gradient icon box (for summary cards)
const GradientIconBox: React.FC<{ colors: [string, string]; icon: React.ReactNode }> = ({
  colors,
  icon,
}) => {
  return (
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: 2,
        display: "grid",
        placeItems: "center",
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        color: "#fff",
        boxShadow: "0 8px 18px rgba(2, 8, 23, 0.10)",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
  );
};

//Priority Chip Renderer
const renderPriorityChip = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "critical":
      return (
        <Chip
          icon={<ErrorOutline sx={{ color: "#f00a0aff !important" }} />}
          label="Critical"
          size="small"
          sx={{
            color: "#DCFCE7",
            bgcolor: "#f00a0aff" ,
            border: 1,
            borderRadius: 1,
            backgroundColor: "white",
            fontSize: 12,
          }}
        />
      );
    case "high":
      return (
        <Chip
          icon={<WarningAmber sx={{ color: "#e8360de1 !important" }} />}
          label="High"
          size="small"
          sx={{
            bgcolor: "#e8360de1",
            color: "#DCFCE7",
            fontWeight: 600,
            borderRadius: "999px",
          }}
        />
      );
    case "medium":
      return (
        <Chip
          icon={<AccessTime sx={{ color: "#d97706 !important" }} />}
          label={priority}
          size="small"
          sx={{
            bgcolor: "#d97706",
            color: "#FEF3C7",
            fontWeight: 600,
            borderRadius: "999px",
          }}
        />
      );
    case "medium-low":
      return (
        <Chip
          icon={<AccessTime sx={{ color: "#ffc908ff !important" }} />}
          label={priority}
          size="small"
          sx={{
            bgcolor: "#ffc908ff",
            color: "#FEF3C7",
            fontWeight: 600,
            borderRadius: "999px",
          }}
        />
      );
    case "low":
      return (
        <Chip
          icon={<CheckCircle sx={{ color: "#15803D !important" }} />}
          label="Low"
          size="small"
          sx={{
            bgcolor: "#16a34a", 
            color: "#DCFCE7",
            fontWeight: 600,
            borderRadius: "999px",
          }}
        />
      );
    default:
      return <Chip label={priority} size="small" />;
  }
};

//Status Chip Renderer
const renderStatusChip = (status: string) => {
  switch (status.toLowerCase()) {
    case "open":
      return (
        <Chip
          icon={<ErrorOutline sx={{ color: "#2563EB !important" }} />}
          label="Open"
          size="small"
          sx={{
            bgcolor: "#EFF6FF",
            color: "#2563EB",
            fontWeight: 600,
            borderRadius: "999px",
          }}
        />
      );
    case "in progress":
      return (
        <Chip
          icon={<Bolt sx={{ color: "#3B82F6 !important" }} />}
          label="In Progress"
          size="small"
          sx={{
            bgcolor: "#E0F2FE",
            color: "#3B82F6",
            fontWeight: 600,
            borderRadius: "999px",
          }}
        />
      );
    case "pending":
      return (
        <Chip
          icon={<AccessTime sx={{ color: "#F59E0B !important" }} />}
          label="Pending"
          size="small"
          sx={{
            bgcolor: "#FEF3C7",
            color: "#F59E0B",
            fontWeight: 600,
            borderRadius: "999px",
          }}
        />
      );
    case "resolved":
      return (
        <Chip
          icon={<CheckCircle sx={{ color: "#16A34A !important" }} />}
          label="Resolved"
          size="small"
          sx={{
            bgcolor: "#DCFCE7",
            color: "#16A34A",
            fontWeight: 600,
            borderRadius: "999px",
          }}
        />
      );
    default:
      return <Chip label={status} size="small" />;
  }
};

const MyTicketsParent: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  //Fetch tickets from API
  const { fetchTickets } = useTicketAPI();
  
  useEffect(() => {
    const fetchTicketsQuery = async () => {
      try {
        const res = await fetchTickets();
        console.log("Tickets:", res.data);
        setTickets(res.data || []);
      } catch (err) {
        console.error("Error fetching tickets", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicketsQuery();
  }, []);

  //Counts
  const totalCount = tickets.length;
  const activeCount = tickets.filter((t) => t.STATUS.toLowerCase() !== "resolved").length;
  const resolvedCount = tickets.filter((t) => t.STATUS.toLowerCase() === "resolved").length;
//   useEffect(() => {
//   const loadTickets = async () => {
//     try {
//       const response = await fetchTickets();
//       console.log("Tickets:", response);
//     } catch (err) {
//       console.error("Error fetching tickets", err);
//     }
//   };

//   loadTickets();
// }, [fetchTickets]);
  // setTickets(responseData)
  //Filtered tickets
  const filteredTickets = useMemo(() => {
    const byTab = tickets.filter((t) =>
      tab === 0 ? t.STATUS.toLowerCase() !== "resolved" : t.STATUS.toLowerCase() === "resolved"
    );

    const byPriority =
      priorityFilter === "all"
        ? byTab
        : byTab.filter((t) =>
          t.PRIORITY.toLowerCase().includes(priorityFilter.toLowerCase())
        );

    if (!searchQuery.trim()) return byPriority;

    const q = searchQuery.toLowerCase();
    return byPriority.filter(
      (t) => t.TITLE.toLowerCase().includes(q) || t.DESCRIPTION.toLowerCase().includes(q)
    );
  }, [tickets, tab, searchQuery, priorityFilter]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Typography>Loading tickets...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 0 }}>
      {/* Summary cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 4,
        }}
      >
        {/* Total Tickets */}
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            minHeight: 120,
            width: "100%",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.13)",
            },
          }}
        >
          <CardContent
            sx={{
              py: 3,
              px: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              mt:2,   
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 11, color: "#64748B" }}>
                TOTAL TICKETS
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1,
                  mt: 0.5,
                  color: "#0F172A",
                  whiteSpace: "nowrap",
                }}
              >
                {totalCount}
              </Typography>
              <Typography
                sx={{
                  fontSize: 11,
                  color: "#94A3B8",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                All Time Requests
              </Typography>
            </Box>
            <GradientIconBox
              colors={["#2563EB", "#10B981"]}
              icon={<ConfirmationNumberOutlined sx={{ fontSize: 28 }} />}
            />
          </CardContent>
        </Card>

        {/* Active Tickets */}
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            minHeight: 160,
            width: "100%",
            pt:0,
            m: 0,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
            },
          }}
        >
          <CardContent
            sx={{
              py: 3,
              px: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              mt:2
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 11, color: "#64748B" }}>
                ACTIVE TICKETS
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1,
                  mt: 0.5,
                  color: "#0F172A",
                  whiteSpace: "nowrap",
                }}
              >
                {activeCount}
              </Typography>
              <Typography
                sx={{
                  fontSize: 11,
                  color: "#94A3B8",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                Pending Resolution
              </Typography>
            </Box>
            <GradientIconBox
              colors={["#FFE49C", "#F59E0B"]}
              icon={<WarningAmber sx={{ fontSize: 28 }} />}
            />
          </CardContent>
        </Card>

        {/* Resolved Tickets */}
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            minHeight: 160,
            width: "100%",
            pt:0,
            m: 0,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
            },
          }}
        >
          <CardContent
            sx={{
              py: 3,
              px: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              mt:2
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 11, color: "#64748B" }}>
                RESOLVED TICKETS
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1,
                  mt: 0.5,
                  color: "#0F172A",
                  whiteSpace: "nowrap",
                }}
              >
                {resolvedCount}
              </Typography>
              <Typography
                sx={{
                  fontSize: 11,
                  color: "#94A3B8",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                Successfully Closed
              </Typography>
            </Box>
            <GradientIconBox
              colors={["#22C55E", "#22C55E"]}
              icon={<CheckCircle sx={{ fontSize: 28 }} />}
            />
          </CardContent>
        </Card>
      </Box>

      {/* Search & filter */}
      <Paper
        sx={{
          p: 2.5,
          mt: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Search sx={{ color: "#2563EB" }} />
          <Typography sx={{ fontWeight: 700, fontSize: "15px", color: "#0F172A" }}>
            Search & Filter Tickets
          </Typography>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexDirection: { xs: "column", md: "row" },
            mt: 1,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search Tickets By Title Or Description..."
            size="medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: "1 1 auto",
              "& .MuiInputBase-root": { height: 41, borderRadius: 1, fontSize: 13 },
            }}
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <FormControl
              size="small"
              sx={{
                ml: { md: "auto" },
                width: { xs: "100%", md: 220 },
              }}
            >
              <InputLabel >All Priorities</InputLabel>
              <Select
                label="All Priorities"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(String(e.target.value))}
                input={
                  <OutlinedInput
                    label="All Priorities"
                    startAdornment={
                      <InputAdornment position="start">
                        <FilterAltOutlined sx={{
                          fontSize: 25,
                          color: "#6B7280",
                        }} />
                      </InputAdornment>
                    }
                  />
                }
                sx={{
                  "& .MuiOutlinedInput-root": { height: 41, borderRadius: 1 },
                }}
              >
                <MenuItem value="all">All Priorities</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>

            {priorityFilter !== "all" && (
              <IconButton
                size="small"
                onClick={() => setPriorityFilter("all")}
                sx={{
                  color: "red",
                  "&:hover": { bgcolor: "transparent", color: "#b91c1c" },
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            )}
          </Stack>

        </Box>
      </Paper>

      {/* Tabs / Pills */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
        sx={{ mt: 3 }}
      >
        {/* Left: Tab Pills */}
        <Box
          sx={{
            display: "flex",
            p: 0.5,
            borderRadius: 999,
            border: "1px solid #E2E8F0",
            bgcolor: "#fff",
            gap: 1,
          }}
        >
          {/* Active Tickets */}
          <Box
            onClick={() => setTab(0)}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 0.75,
              borderRadius: 999,
              cursor: "pointer",
              background:
                tab === 0
                  ? "linear-gradient(90deg, #3B82F6, #10B981)"
                  : "transparent",
              color: tab === 0 ? "#fff" : "#0F172A",
              fontWeight: 600,
              fontSize: 14,
              transition: "all 0.2s ease-in-out",
            }}
          >
            <WarningAmber sx={{ fontSize: 18, mr: 1 }} />
            Active Tickets
            <Box
              sx={{
                ml: 1,
                px: 1.25,
                py: "2px",
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 700,
                bgcolor: tab === 0 ? "rgba(255,255,255,0.25)" : "#22C55E",
                color: "#fff",
              }}
            >
              {activeCount}
            </Box>
          </Box>

          {/* Resolved Tickets */}
          <Box
            onClick={() => setTab(1)}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 0.75,
              borderRadius: 999,
              cursor: "pointer",
              background:
                tab === 1
                  ? "linear-gradient(90deg, #10B981, #10B981)"
                  : "transparent",
              color: tab === 1 ? "#fff" : "#0F172A",
              fontWeight: 600,
              fontSize: 14,
              transition: "all 0.2s ease-in-out",
            }}
          >
            <CheckCircle sx={{ fontSize: 18, mr: 1 }} />
            Resolved Tickets
            <Box
              sx={{
                ml: 1,
                px: 1.25,
                py: "2px",
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 700,
                bgcolor: "#22C55E",
                color: "#fff",
              }}
            >
              {resolvedCount}
            </Box>
          </Box>
        </Box>

        {/* Right: Ticket count summary */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: { xs: 2, md: 0 } }}>
          <TrendingUp sx={{ fontSize: 16, color: "#64748B" }} />
          <Typography sx={{ color: "#94A3B8", fontSize: 12 }}>
            Showing {filteredTickets.length} of{" "}
            {tab === 0 ? activeCount : resolvedCount} tickets
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ mt: 2.5 }}>
        <Paper
          elevation={0}
          sx={{
            px: 2,
            py: 1.5,
            mb: 1.5,
            borderRadius: 3,
            border: "1px solid #E2E8F0",
            bgcolor: "#FFFFFF",
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: 0.5,
                  background: "linear-gradient(135deg,#A5B4FC,#60A5FA)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <ConfirmationNumberOutlined sx={{ color: "#fff", fontSize: 14 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {tab === 0 ? "Active Tickets" : "Resolved Tickets"}
              </Typography>
            </Stack>
            <Button
              size="small"
              variant="contained"
              sx={{ borderRadius: 2, textTransform: "none", bgcolor: "#2563EB" }}
            >
              {filteredTickets.length} Items
            </Button>
          </Stack>
        </Paper>
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table aria-label="tickets table">
            <TableHead>
              <TableRow sx={{ bgcolor: "#F8FAFC" }}>
                <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Ticket Details</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Created</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: "#475569" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.ID} hover>
                  <TableCell component="th" scope="row">
                    <Typography sx={{ fontWeight: 600, fontSize: 13 }}>
                      {ticket.TITLE}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748B", fontSize: 12 }}>
                      {ticket.DESCRIPTION}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: 13 }}>{ticket.TYPE}</TableCell>
                  <TableCell>{renderPriorityChip(ticket.PRIORITY)}</TableCell>
                  <TableCell>{renderStatusChip(ticket.STATUS)}</TableCell>
                  <TableCell sx={{ fontSize: 13 }}>
                    {new Date(ticket.CREATED_AT).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      sx={{
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        "&:hover": { color: "#2563EB", transform: "scale(1.15)" },
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default MyTicketsParent;
