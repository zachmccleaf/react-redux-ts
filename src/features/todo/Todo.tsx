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
            id: guidGenerator(),
        }
        setCurrentTodo(todoItem);
    }

    const todoList =  todos.map((todo: TodoItem, index) => {
        return (
            <TodoListItem key={index} todo={todo} />
        );
    })

    const guidGenerator = () => {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

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

