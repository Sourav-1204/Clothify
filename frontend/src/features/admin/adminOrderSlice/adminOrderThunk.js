import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { readFromLocalStorage } from "../../../utils/localStorageHelper";


const backendUrl = import.meta.env.VITE_BACKEND_URL;


// Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk("adminOrders/fetchAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${backendUrl}/api/admin/orders`, {
                headers: {
                    Authorization: `Bearer ${readFromLocalStorage("userToken")}`,
                }
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// Update order delivery status (admin only)
export const updateOrderStatus = createAsyncThunk("adminOrders/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${backendUrl}/api/admin/orders/${id}`, { status }, {
                headers: {
                    Authorization: `Bearer ${readFromLocalStorage("userToken")}`,
                }
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// Delete an order 
export const deleteOrder = createAsyncThunk("adminOrders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${backendUrl}/api/admin/orders/${id}`, {
                headers: {
                    Authorization: `Bearer ${readFromLocalStorage("userToken")}`,
                }
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)