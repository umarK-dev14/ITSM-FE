import React from "react";
import Layout from "./LayoutPage";
import MyTicketsParent from "../components/MyTicketsParent";
import { motion } from "framer-motion";

const MyTicketPage: React.FC = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: -30 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <MyTicketsParent />
      </motion.div>
    </Layout>
  );
};

export default MyTicketPage;
