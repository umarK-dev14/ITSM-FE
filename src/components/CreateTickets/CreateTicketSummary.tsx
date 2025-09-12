import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { useTicket } from "../../context/ticket-context";
import { useTicketAPI } from "../../Apis/ticket.API";
import { useEffect, useState } from "react";


export default function CreateTicketSummary() {
  const {selectedType, selectedCategory, ticketDetails} = useTicket();
  const {getAssigneeAndSLA} = useTicketAPI();
  const [assigneeDetails,setAssigneeDetails] = useState({} as any);
  const fetchAssigneeDetails = async () => {
         let res = await getAssigneeAndSLA(ticketDetails.priority_no);
         setAssigneeDetails(res);
      console.log("Assignee Details:", assigneeDetails,assigneeDetails?.assignee?.username,assigneeDetails?.assignee?.role);
  }
  useEffect(()=>{
      fetchAssigneeDetails();
  },[getAssigneeAndSLA])
  return (
    <Box sx={{ maxWidth: "100%", margin: "2rem auto" }}>
      <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" fontSize="15px" gutterBottom>
            Review And Submit
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize="12px" mb={3}>
            Please review your request before submitting
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              borderRadius: 2,
              p: 3,
              mb: 3,
              bgcolor: "background.default",
            }}
          >
            {[
              { label: "Type:", value: selectedType ? selectedType.NAME : "" },
              { label: "Category:", value: selectedCategory ? selectedCategory.NAME : "" },
              {
                label: "Priority:",
                value: (
                  <Box
                    component="span"
                    sx={{
                      bgcolor: "#FFB84D",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: "bold",
                      px: 1.2,
                      py: 0.2,
                      borderRadius: 1,
                    }}
                  >
                    {ticketDetails.priority}
                  </Box>
                ),
              },
              { label: "Title:", value: ticketDetails.title ?? '' },
              { label: "Description:", value: ticketDetails.description ?? '' },
            ].map((item, index) => (
              <Box key={index} display="flex" alignItems="flex-start" mb={1.5}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  fontSize={13}
                  sx={{ minWidth: 90 }}>
                  {item.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 13, color: "text.primary" }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              borderRadius: 2,
              p: 2.5,
              mb: 3,
              bgcolor: "background.paper",
            }}
          >
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <PersonAddAlt1Icon sx={{ color: "#1976d2" }} />
              <Typography variant="subtitle1" fontWeight="bold" fontSize={15}>
                Recommended Assignment
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={0.5}
            >
              <Box display="flex" alignItems="center">
                <GroupIcon fontSize="small" sx={{ mr: 1, color: "orange" }} />
                <Typography variant="body1" fontWeight={500} fontSize={13}>
                  General Support Team
                </Typography>
              </Box>
              
              <Box display="flex" alignItems="center">
              <AccessTimeIcon fontSize="small" /> 
              <Typography
                variant="body2"
                sx={{ fontSize: 14, color: "text.primary" }}>
                    {assigneeDetails?.sla?.responseTimeMins} Mins
              </Typography>
              </Box>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, ml: 3 }}
              fontSize={11}>
                {assigneeDetails?.assignee?.username ?? "Standard initial response time"} : {assigneeDetails?.assignee?.role ?? ""}
            </Typography>

            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={4}
              mb={2}>
              <Box display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTimeIcon fontSize="small" sx={{color: "#0f8ee8ff"}} />
                  <Typography variant="body2" sx={{ fontSize: 13 }}>
                    <strong>SLA Target:</strong>
                    <Typography sx={{ fontSize: 12 }}>{assigneeDetails?.sla?.resolutionTimeMins} Mins</Typography>
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 3, fontSize: 11 }}>
                  Initial response time
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" gap={1}>
                  <PeopleOutlineIcon fontSize="small" color="success" />
                  <Typography variant="body2" sx={{ fontSize: 13 }}>
                    <strong>Assignment Type:</strong> 
                    <Typography sx={{ fontSize: 12 }}>Direct Assignment</Typography>
                  </Typography>
                </Box>
                
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 3, fontSize: 11 }}>
                  Assigned to specific team lead
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                p: 2,
                bgcolor: "rgba(0, 120, 255, 0.08)",
                borderRadius: 2,
              }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <ErrorOutlineIcon fontSize="small" sx={{color:"#0f8ee8ff"}}/>
                <Typography color="primary" fontWeight="500" sx={{color:"#0f8ee8ff", fontSize:13}}>
                  Assignment Information
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{fontSize:12}}>
                This ticket will be directly assigned to {assigneeDetails?.assignee?.username} ( {assigneeDetails?.assignee?.role} ) for immediate attention.
              </Typography>
            </Box>
          </Paper>

          {/* <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Attachments (Optional)
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 2,
              p: 3,
              textAlign: "center",
              borderStyle: "dashed",
            }}
          >
            <UploadFileIcon sx={{ fontSize: 40, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary" mt={1}>
              Drop files here or click to browse
            </Typography>
            <Typography variant="caption" color="text.secondary">
              PNG, JPG, PDF up to 10MB
            </Typography>
          </Paper> */}
        </CardContent>
      </Card>
    </Box>
  );
}
