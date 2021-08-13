import { TodoColors } from "../enums/TodoColors";

export interface TodoItem {
    message: string;
    _id: string; 
    color?: TodoColors;
    isComplete?: boolean;
}

export interface TodoState {
    todos: TodoItem[];
}