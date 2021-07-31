import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import TodoListItem from "./components/TodoListItem";

export enum TodoColors {
    Red = "red",
    Green = "green",
    Blue = "blue",
    Yellow = "yellow",
    Orange = "orange",
}

export interface TodoItem {
    message: string;
    id: string;
    color?: TodoColors;
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
            state.todos = state.todos.filter((item) => item.id != action.payload);
            return state;
        }, 
        updateTodo: (state, action) => {
            state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    todo.message = action.payload.message;
                    todo.color = action.payload.color;
                }
            })
            return state;
        }
    }
}); 

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;