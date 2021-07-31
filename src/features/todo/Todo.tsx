import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TodoListItem from "./components/TodoListItem";
import { addTodo, selectTodo, TodoItem } from "./todoSlice";
import styles from './Todo.module.css'; 

export interface TodoProps {
    isEditing?: boolean;
}

const Todo: React.FunctionComponent<TodoProps> = (
    props: TodoProps
) => {
    const todos = useAppSelector(selectTodo);
    const dispatch = useAppDispatch();

    const [currentTodo, setCurrentTodo] = useState<TodoItem>();

    const handleInputChange = (todo: string) => {
        const todoItem = {
            message: todo,
            id: Math.random().toString(36).substring(7),
        }
        setCurrentTodo(todoItem);
    }

    const todoList =  todos.map((todo: TodoItem) => {
        return (
            <TodoListItem todo={todo} />
        );
    })

    return (
        <div className={styles.todo}>
            <input className={styles.todoInput} onChange={(e) => handleInputChange(e.target.value)} type="text" />
            <button className={styles.todoButton} onClick={() => dispatch(addTodo(currentTodo))}>Add Todo</button>
            <div>
                <ul className={styles.todoList}>
                    {todoList}
                </ul>
            </div>
        </div>
    );
}

export default Todo;

