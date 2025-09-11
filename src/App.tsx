import React, { type JSX } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import CreateTicketPage from "./pages/CreateTicketPage";
import RequestTypes from "./components/CreateTickets/RequestTypes";
import CategoryStep from "./components/CreateTickets/CategoryStep";
import { TicketProvider } from "./context/ticket-context";
import DashboardPage from "./pages/DashboardPage";
import TicketDetails from "./components/CreateTickets/TicketDetails";
import MyTicketPage from "./pages/MyTicketPage";

const App: React.FC = (): JSX.Element => {
  return (
    <TicketProvider>
      <Routes>
        {/* public route */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tickets" element={<MyTicketPage/>} />
        {/* protected / authenticated routes */}
        <Route path="/create-ticket" element={<CreateTicketPage />}>
          <Route index element={<Navigate to="requesttype" replace />} />
          <Route path="requesttype" element={<RequestTypes />} />
          <Route path="category" element={<CategoryStep />} />
          <Route path="ticketdetails" element={<TicketDetails />} />
        </Route>
      </Routes>
    </TicketProvider>
  );
};

export default App;
