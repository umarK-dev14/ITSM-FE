import React, { type JSX } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import CreateTicketPage from "./pages/CreateTicketPage";
const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Routes>
        {/* public route */}
        <Route path="/" element={<LoginPage />} />

        {/* protected / Authenticate routes with layout */}
        <Route path="/create-ticket" element={<CreateTicketPage/>} />
        <Route />
      </Routes>
    </>
  );
};

export default App;
