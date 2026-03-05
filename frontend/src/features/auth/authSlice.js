import { createSlice } from "@reduxjs/toolkit"
import { loginUser, registerUser } from "./authThunk";
import { readFromLocalStorage, removeFromLocalStorage, storeInLocalStorage } from "../../utils/localStorageHelper"

// Retrieve user info and token from localStorage if available
const userInfo = readFromLocalStorage("userInfo");

// Check for an existing guest ID in the localStorage or generate a new One
const initialGuestId = readFromLocalStorage("guestId") || `guest_${new Date().getTime()}`;
storeInLocalStorage("guestId", initialGuestId);

const initialState = {
    user: userInfo,
    guestId: initialGuestId,
    loading: false,
    error: null
}

// Slice 
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`; // Reset guestId on logout
            removeFromLocalStorage("userInfo");
            removeFromLocalStorage("userToken");
            storeInLocalStorage("guestId", state.guestId); // Set new guest ID in localstorage
        },
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            storeInLocalStorage("guestId", state.guestId);
        }
    },
    extraReducers: (builder) => {

        // Login User
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

        // Register User
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;