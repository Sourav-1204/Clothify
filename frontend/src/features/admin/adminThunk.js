import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { readFromLocalStorage } from "../../utils/localStorageHelper"

// Fetch all users (admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
            headers: {
                Authorization: `Bearer ${readFromLocalStorage("userToken")}`
            }
        })
        return response.data;
    } catch (error) {
        return error.response.data
    }
});

// Add the create user action
export const addUser = createAsyncThunk("admin/addUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, userData,
            {
                headers: {
                    Authorization: `Bearer ${readFromLocalStorage("userToken")}`
                }
            }
        )
        return response.data.newUser;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// Update user info
export const updateUser = createAsyncThunk("admin/updateUser", async ({ id, name, email, role }) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, { name, email, role },
        {
            headers: {
                Authorization: `Bearer ${readFromLocalStorage("userToken")}`
            }
        }
    )
    return response.data.updatedUser;
})

// Delete a user 
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${readFromLocalStorage("userToken")}`
                },
            }
        )
        return id;
    } catch (error) {
        return error.response.data;
    }
})


