import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { readFromLocalStorage } from "../../utils/localStorageHelper";

// Async thunk to create a checkout session
export const createCheckout = createAsyncThunk("checkout/createCheckout", async (checkoutData, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
            checkoutData,
            {
                headers: {
                    Authorization: `Bearer ${readFromLocalStorage("userToken")}`
                }
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.reponse.data);
    }
})