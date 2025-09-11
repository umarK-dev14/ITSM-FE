import React, { type JSX } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import CreateTicketPage from "./pages/CreateTicketPage";
import RequestTypes from "./components/CreateTickets/RequestTypes";
import CategoryStep from "./components/CreateTickets/CategoryStep";
import { TicketProvider } from "./context/ticket-context";

const App: React.FC = (): JSX.Element => {
  return (
    <TicketProvider>
      <Routes>
        {/* public route */}
        <Route path="/" element={<LoginPage />} />

        {/* protected / authenticated routes */}
        <Route path="/create-ticket" element={<CreateTicketPage />}>
          <Route path="requesttype" element={<RequestTypes />} />
          <Route path="category" element={<CategoryStep />} />
        </Route>
      </Routes>
    </TicketProvider>
  );
};

export default App;
