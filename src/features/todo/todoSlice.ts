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
            const test = state.todos.filter((item) => item.id != action.payload);
            console.log("test", JSON.stringify(test));
            
            state.todos.filter((item) => item.id != action.payload);
            return state;
        }, 
        updateTodo: (state, action) => {
            var index = state.todos.map(x => {
                return x.id;
            }).indexOf(action.payload.id);
            state.todos[index] = action.payload;
            return state;
        }
    }
}); 

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;