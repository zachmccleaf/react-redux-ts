import React, { useEffect, useState } from "react";
import TodoListItem from "./components/TodoListItem";
import { TodoItem } from "./todoSlice";
import styles from './Todo.module.css'; 
import axios from "axios";

export interface TodoProps {
}

const Todo: React.FunctionComponent<TodoProps> = (
    props: TodoProps
) => {
    const [todos, setTodos] = useState<TodoItem[]>();
    const [currentTodo, setCurrentTodo] = useState<TodoItem>();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get('http://localhost:8080/api/todos')
            .then((res) => {
                setTodos(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteData = (id: string) => {
        const deleteUrl = `http://localhost:8080/api/todos/${id}`;
        axios
            .delete(deleteUrl)
            .then((res) => {
                fetchData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateData = (todo: TodoItem) => {
        console.log('update', todo);
        const updateUrl = `http://localhost:8080/api/todos/${todo._id}`;
        axios
            .put(updateUrl, todo)
            .then((res) => {
                console.log(res);
                fetchData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addTodo = (todo: TodoItem) => {
        axios
            .post('http://localhost:8080/api/todos', JSON.stringify(todo))
            .then((res) => {
                fetchData();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleInputChange = (todo: string) => {
        const todoItem = {
            message: todo,
            _id: '',
        }
        setCurrentTodo(todoItem);
    }

    return (
        <div className={styles.todo}>
            <input className={styles.todoInput} onChange={(e) => handleInputChange(e.target.value)} type="text" />
            <button className={styles.todoButton} onClick={() => addTodo(currentTodo!)}>Add Todo</button>
            <div>
                <ul className={styles.todoList}>
                    { // if 
                        todos &&

                            todos.map((todo: TodoItem, index) => {
                                return (
                                    <TodoListItem key={index} todo={todo} deleteTodo={() => deleteData(todo._id)} updateTodo={updateData} />
                                );
                            })
                    }
                </ul>
            </div>
            <div className={styles.todoFooter}>
                <button>Save</button>
            </div>
        </div>
    );
}

export default Todo;

