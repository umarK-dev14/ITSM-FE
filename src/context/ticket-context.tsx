"use client";
import type React from "react";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface TicketDetails {
  title: string;
  description: string;
  priority: string;
  priority_no: string;
}

// interface Category {
//   ID: number;
//   NAME: string;
//   REQ_TYPE_ID: number;
// }

// interface RequestType {
//   ID: number;
//   NAME: string;
//   DESCRIPTION: string;
//   Categories: Category[];
// }

interface User {
  ID: number;
  USERNAME: string;
  EMAIL: string;
  PHONE_NUM: string;
  DEPARTMENT_ID: number;
  REGION: string;
}

interface TicketContextType {
  // 🔹 Auth state
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;

  // 🔹 Ticket state
  selectedType: number | null;
  selectedCategory: number | null;
  ticketDetails: TicketDetails;
  requestData: any;
  setRequestData: any;
  setSelectedType: (typeId: number | null) => void;
  setSelectedCategory: (categoryId: number | null) => void;
  setTicketDetails: (details: TicketDetails) => void;
  calculatePriority: (urgency: string, impact: string) => { level: string };
}

const calculatePriorityFn = (urgency: string, impact: string) => {
  if (!urgency || !impact) return { level: "N/A" };

  const matrix: Record<string, Record<string, string>> = {
    Low: {
      Low: "P5 (Low)",
      Medium: "P4 (Medium)",
      High: "P3 (Medium)",
      Critical: "P2 (High)",
    },
    Medium: {
      Low: "P4 (Medium)",
      Medium: "P3 (Medium)",
      High: "P2 (High)",
      Critical: "P1 (Critical)",
    },
    High: {
      Low: "P3 (Medium)",
      Medium: "P2 (High)",
      High: "P1 (Critical)",
      Critical: "P1 (Critical)",
    },
    Critical: {
      Low: "P2 (High)",
      Medium: "P1 (Critical)",
      High: "P1 (Critical)",
      Critical: "P1 (Critical)",
    },
  };

  return { level: matrix[urgency][impact] };
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTicket = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTicket must be used within a TicketProvider");
  }
  return context;
};

interface TicketProviderProps {
  children: ReactNode;
}

export const TicketProvider: React.FC<TicketProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [ticketDetails, setTicketDetails] = useState<TicketDetails>({
    title: "",
    description: "",
    priority:"",
    priority_no:""
  });
  

  const [requestData, setRequestData] = useState([]);

  // Load token + user from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("authToken");
      const savedUser = localStorage.getItem("authUser");
      if (savedToken) {
        setToken(savedToken);
      }
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      // ignore localStorage errors
      console.warn("ticket-context: failed to load auth from localStorage", e);
    }
  }, []);

  // 🔹 Auth actions
  const login = (user: User, restoken: string) => {
    try {
      setUser(user);
      setToken(restoken);
      localStorage.setItem("authToken", restoken);
      localStorage.setItem("authUser", JSON.stringify(user));
    } catch (e) {
      console.warn("ticket-context: failed to persist auth to localStorage", e);
    }

    // debug - log the fresh token passed in (avoid logging state variable directly)
    console.log("User logged in with token:", restoken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    } catch (e) {
      console.warn("ticket-context: failed to clear localStorage on logout", e);
    }
  };

  return (
    <TicketContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        selectedType,
        selectedCategory,
        ticketDetails,
        requestData,
        setRequestData,
        setSelectedType,
        setSelectedCategory,
        setTicketDetails,
        calculatePriority: calculatePriorityFn,
        // resetTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
