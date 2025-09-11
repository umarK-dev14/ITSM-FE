"use client";
import Swal from "sweetalert2";
import { useCallback, useEffect } from "react";
import { useTicket } from "../context/ticket-context";

const API_BASE_URL = import.meta.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const useTicketAPI = () => {
    // include login here if needed by loginUser
    const {
        token,
        setRequestData,
        ticketDetails,
        selectedCategory,
        selectedType,
        user,
        // login is not needed here for other operations, loginUser will call it if required
    } = useTicket();

    // 🔹 Common fetch wrapper

    let authToken = token ? token : localStorage.getItem("authToken");

    useEffect(() => {
        authToken = token ? token : localStorage.getItem("authToken");
    }, [token])

    const apiCall = useCallback(
        async (url: string, method = "GET", body?: any) => {
            try {
                // debug: show the token value being used for the request
                console.log("👉 Using token:", token);

                const res = await fetch(`${API_BASE_URL}${url}`, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
                    },
                    body: body ? JSON.stringify(body) : undefined,
                });

                // attempt to parse json safely
                let data;
                try {
                    data = await res.json();
                } catch (e) {
                    // if response not JSON, still treat as error if not ok
                    if (!res.ok) {
                        throw new Error(`HTTP ${res.status}`);
                    }
                    return null;
                }

                if (!res.ok) {
                    Swal.fire({
                        title: "API Error",
                        text: data?.message || "Something went wrong",
                        icon: "error",
                    });
                    throw new Error(data?.message || `API Error: ${res.status}`);
                }

                return data;
            } catch (err: any) {
                console.error("API Error:", err);
                throw err;
            }
        },
        [token]
    );

    // 🔹 Auth APIs
    // destructure login here to update context when loginUser is called
    const { login } = useTicket();
    const loginUser = async (email: string, password: string) => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                // try to read error message
                let errMsg = "Login failed";
                try {
                    const errData = await res.json();
                    errMsg = errData?.message || errMsg;
                } catch { }
                throw new Error(errMsg);
            }

            const data = await res.json();
            console.log("Login response data:::::", data);
            // expected response structure: { user: {...}, token: "jwt-token", ... }
            if (data && data.user && data.token) {
                // update context
                login(data.user, data.token);
            } else {
                throw new Error("Invalid login response from server");
            }

            return data;
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        }
    };

    // 🔹 Ticket APIs
    const fetchRequestTypes = useCallback(async () => {
        const data = await apiCall(`/api/tickets/getRequestTypes`, "GET");
        if (data && data.data) {
            setRequestData(data.data);
        }
        return data;
    }, [apiCall, setRequestData]);

    const fetchTickets = useCallback(async () => {
        return await apiCall(`/api/tickets/getTickets`, "GET");
    }, [apiCall]);

    const createTicket = useCallback(
        async (priority: string) => {
            if (!selectedType || !selectedCategory) {
                Swal.fire(
                    "Validation Error",
                    "Please select type and category",
                    "warning"
                );
                return;
            }

            const payload = {
                title: ticketDetails.title,
                description: ticketDetails.description,
                requestor_id: user?.ID,
                type_id: selectedType,
                category_id: selectedCategory,
                priority,
            };

            return await apiCall(`/api/tickets`, "POST", payload);
        },
        [apiCall, selectedType, selectedCategory, ticketDetails, user]
    );

    const getAssigneeAndSLA = useCallback(
        async (priority: string) => {
            return await apiCall(`/api/tickets/assignment`, "POST", { priority });
        },
        [apiCall]
    );

    // 🔹 Auto-load request types once token is ready (only when token changes)
    useEffect(() => {
        if (authToken) {
            fetchRequestTypes();
            const fetchSample = async () => {
                try {
                    const sampleResponse = await getAssigneeAndSLA("P3");
                    console.log("Sample SLA/Assignee response:", sampleResponse);
                } catch (err) {
                    console.error("Error fetching SLA/Assignee:", err);
                }
            };

            fetchSample();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authToken]);

    return {
        loginUser,
        fetchRequestTypes, // still exposed if you need manual refresh
        fetchTickets,
        createTicket,
        getAssigneeAndSLA,
    };
};
