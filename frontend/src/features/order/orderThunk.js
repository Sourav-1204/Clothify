import { createAsyncThunk } from "@reduxjs/toolkit";
import { readFromLocalStorage } from "../../utils/localStorageHelper";
import axios from "axios";


// Async Thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
                {
                    headers: {
                        Authorization: `Bearer ${readFromLocalStorage("userToken")}`
                    }
                }
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// Aync thunk to fetch orders details by ID
export const fetchOrderDetails = createAsyncThunk("orders/fetchOrderDetails",
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${readFromLocalStorage("userToken")}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
