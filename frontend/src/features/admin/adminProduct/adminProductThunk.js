import { createAsyncThunk } from "@reduxjs/toolkit";
import { readFromLocalStorage } from "../../../utils/localStorageHelper";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const userToken = `Bearer ${readFromLocalStorage("userToken")}`;

// Async thunk to ferch admin products
export const fetchAdminProducts = createAsyncThunk("adminProducts/fetchProducts",
    async () => {
        const response = await axios.get(`${backendUrl}/api/admin/products`, {
            headers: {
                Authorization: userToken
            }
        })
        return response.data
    }
)

// Async thunk to create a new product
export const createProduct = createAsyncThunk("adminProducts/createProduct",
    async (productData) => {
        const response = await axios.post(
            `${backendUrl}/api/admin/products`,
            productData,
            {
                headers: {
                    Authorization: userToken
                }
            }
        )
        return response.data;
    }
)

// Async thunk to update product
export const updateProduct = createAsyncThunk("adminPorduct/updateProduct",
    async ({ id, productData }) => {
        try {
            const response = await axios.put(backendUrl + "/api/admin/products" + id, productData,
                {
                    headers: {
                        Authorization: userToken
                    }
                }
            )
            return response.data;
        } catch (error) {
            return error.response?.data || "Error in updating product";
        }
    }
)

// Async thunk to delete the product
export const deleteProduct = createAsyncThunk("adminProduct/deleteProduct",
    async (id) => {
        const response = await axios.delete(backendUrl + "/api/products/" + id,
            {
                headers: {
                    Authorization: userToken
                }
            }
        )
        return response.data;
    }
)
