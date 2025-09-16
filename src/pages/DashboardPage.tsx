import React from "react";
import Layout from "./LayoutPage";
import Dashboard from "../components/Dashboard";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: -30 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Dashboard />
      </motion.div>
    </Layout>
  );
}
