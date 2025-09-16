import React from "react";
import CreateTickets from "../components/CreateTickets/CreateTickets";
import Layout from "./LayoutPage";
import { motion } from "framer-motion";

const CreateTicketPage: React.FC = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: -30 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <CreateTickets />
      </motion.div>
    </Layout>
  );
};

export default CreateTicketPage;
