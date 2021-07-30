import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface LogInState {
    isLoggedIn: boolean;
}

const initialState: LogInState = {
    isLoggedIn: false,
}

export const logInSlice = createSlice({
    name: 'logIn', 
    initialState,
    reducers: {
        logIn: (state) => {
            state.isLoggedIn = true;
        },
        logOut: (state) => { 
            state.isLoggedIn = false;
        }
    }
});

export const { logIn, logOut } = logInSlice.actions;

export const selectLoggedIn = (state: RootState) => state.logIn.isLoggedIn;

export default logInSlice.reducer;