import React from "react";
import Layout from "./LayoutPage";
import SelfService from "../components/SelfServices/SelfService";
import { motion } from "framer-motion";

const SelfServicePage: React.FC = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: -30 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SelfService />
      </motion.div>
    </Layout>
  );
};

export default SelfServicePage;
