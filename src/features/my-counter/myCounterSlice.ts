import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface MyCounterState {
    value: number;
}

const initialState: MyCounterState = {
    value: 0,
}

export const myCounterSlice = createSlice({
    name: 'myCounter', 
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => { 
            state.value -= 1;
        },
        incrementBy: (state, action) => {
            state.value += action.payload;
        }
    }
});

export const { increment, decrement, incrementBy } = myCounterSlice.actions;

export const selectMyCount = (state: RootState) => state.myCounter.value;

export default myCounterSlice.reducer;