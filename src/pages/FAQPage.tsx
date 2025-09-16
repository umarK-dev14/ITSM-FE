import React from "react";
import Layout from "./LayoutPage";
import FAQParent from "../components/FAQParent";
import { motion } from "framer-motion";

const FAQPage: React.FC = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: -30 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <FAQParent />
      </motion.div>
    </Layout>
  );
};

export default FAQPage;
