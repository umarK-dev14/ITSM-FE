"use client";
import type React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";

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

// interface RequestData {
//   requestTypes: RequestType[];
// }

interface TicketContextType {
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
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [ticketDetails, setTicketDetails] = useState<TicketDetails>({
    title: "",
    description: "",
    priority:"",
    priority_no:""
  });
  const responseData = {
    message: "Request Types with categories fetched successfully",
    data: [
      {
        ID: 1,
        NAME: "Incident",
        DESCRIPTION: "Something is broken and needs to be fixed",
        createdAt: "2025-09-08T09:37:49.857Z",
        updatedAt: "2025-09-08T09:37:49.857Z",
        Categories: [
          {
            ID: 1,
            NAME: "Network",
            REQUEST_TYPE_ID: 1,
          },
          {
            ID: 2,
            NAME: "Email",
            REQUEST_TYPE_ID: 1,
          },
          {
            ID: 3,
            NAME: "Hardware",
            REQUEST_TYPE_ID: 1,
          },
          {
            ID: 4,
            NAME: "Software",
            REQUEST_TYPE_ID: 1,
          },
          {
            ID: 5,
            NAME: "Security",
            REQUEST_TYPE_ID: 1,
          },
          {
            ID: 6,
            NAME: "Access",
            REQUEST_TYPE_ID: 1,
          },
        ],
      },
      {
        ID: 2,
        NAME: "Service Request",
        DESCRIPTION: "Request for something new or a change",
        createdAt: "2025-09-08T09:37:49.857Z",
        updatedAt: "2025-09-08T09:37:49.857Z",
        Categories: [
          {
            ID: 7,
            NAME: "Software Installation",
            REQUEST_TYPE_ID: 2,
          },
          {
            ID: 8,
            NAME: "Hardware Request",
            REQUEST_TYPE_ID: 2,
          },
          {
            ID: 9,
            NAME: "Access Request",
            REQUEST_TYPE_ID: 2,
          },
          {
            ID: 10,
            NAME: "Account Setup",
            REQUEST_TYPE_ID: 2,
          },
        ],
      },
      {
        ID: 3,
        NAME: "Problem",
        DESCRIPTION: "Root cause analysis needed",
        createdAt: "2025-09-08T09:37:49.857Z",
        updatedAt: "2025-09-08T09:37:49.857Z",
        Categories: [
          {
            ID: 11,
            NAME: "Recurring Issues",
            REQUEST_TYPE_ID: 3,
          },
          {
            ID: 12,
            NAME: "Performance",
            REQUEST_TYPE_ID: 3,
          },
          {
            ID: 13,
            NAME: "System Analysis",
            REQUEST_TYPE_ID: 3,
          },
        ],
      },
      {
        ID: 4,
        NAME: "Change Request",
        DESCRIPTION: "Planned change to IT services",
        createdAt: "2025-09-08T09:37:49.857Z",
        updatedAt: "2025-09-08T09:37:49.857Z",
        Categories: [
          {
            ID: 14,
            NAME: "System Updates",
            REQUEST_TYPE_ID: 4,
          },
          {
            ID: 15,
            NAME: "Configuration Changes",
            REQUEST_TYPE_ID: 4,
          },
          {
            ID: 16,
            NAME: "Infrastructure",
            REQUEST_TYPE_ID: 4,
          },
        ],
      },
      {
        ID: 5,
        NAME: "Asset Request",
        DESCRIPTION: "Request for hardware or software\r\n\r\n",
        createdAt: "2025-09-08T09:37:49.857Z",
        updatedAt: "2025-09-08T09:37:49.857Z",
        Categories: [
          {
            ID: 17,
            NAME: "Laptop",
            REQUEST_TYPE_ID: 5,
          },
          {
            ID: 18,
            NAME: "Desktop",
            REQUEST_TYPE_ID: 5,
          },
          {
            ID: 19,
            NAME: "Mobile Device",
            REQUEST_TYPE_ID: 5,
          },
          {
            ID: 20,
            NAME: "Software License",
            REQUEST_TYPE_ID: 5,
          },
        ],
      },
      {
        ID: 6,
        NAME: "Knowledge Suggestion",
        DESCRIPTION: "Suggest an improvement to documentation",
        createdAt: "2025-09-08T09:37:49.857Z",
        updatedAt: "2025-09-08T09:37:49.857Z",
        Categories: [
          {
            ID: 21,
            NAME: "Process Improvement",
            REQUEST_TYPE_ID: 6,
          },
          {
            ID: 22,
            NAME: "Documentation",
            REQUEST_TYPE_ID: 6,
          },
          {
            ID: 23,
            NAME: "Training",
            REQUEST_TYPE_ID: 6,
          },
        ],
      },
    ],
  };
  const [requestData, setRequestData] = useState(responseData.data);


  return (
    <TicketContext.Provider
      value={{
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
