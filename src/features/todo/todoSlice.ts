import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export enum TodoColors {
    Red = "red",
    Green = "green",
    Blue = "blue",
    Yellow = "yellow",
    Orange = "orange",
}

export interface TodoItem {
    message: string;
    _id: string; 
    color?: TodoColors;
    isComplete?: boolean;
}

export interface TodoState {
    todos: TodoItem[];
}

const initialState: TodoState = {
    todos: [],
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
            return state;
        }, 
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((item) => item._id !== action.payload);
            return state;
        }, 
        updateTodo: (state, action) => {
            state.todos.map(todo => {
                if (todo._id === action.payload.id) {
                    todo.message = action.payload.message;
                    todo.color = action.payload.color;
                    todo.isComplete = action.payload.isComplete;
                }
            })
            return state;
        }
    }
}); 

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;