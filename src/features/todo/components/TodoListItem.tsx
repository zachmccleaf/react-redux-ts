import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { removeTodo, TodoColors, TodoItem, updateTodo } from "../todoSlice";
import styles from './TodoListItem.module.css'; 

export interface TodoListItemProps {
    todo: TodoItem;
}

const TodoListItem: React.FunctionComponent<TodoListItemProps> = (
    props: TodoListItemProps
) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState<TodoItem>();

    const dispatch = useAppDispatch(); 

    const todoListItemClassName = props.todo.isComplete ? styles.todoItemComplete : styles.todoItem;
    console.log(todoListItemClassName);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    }

    const handleSaveClick = () => {
        dispatch(updateTodo({
            ...props.todo,
            message: currentTodo?.message,
            color: currentTodo?.color,
        }));
        setIsEditing(!isEditing);
    }

    const handleInputChange = (todo: string) => {
        setCurrentTodo({
            ...props.todo,
            color: currentTodo?.color,
            message: todo,
        });
    }

    const handleColorChange = (color: string) => {
        const message = currentTodo?.message ? currentTodo.message : props.todo.message;
        setCurrentTodo({
            ...props.todo,
            message: message,
            color: color as TodoColors,
        });
    }

    const handleCheckboxClick = (isComplete: boolean) => {
        const message = currentTodo?.message ? currentTodo.message : props.todo.message;
        dispatch(updateTodo({
            ...props.todo,
            message: message,
            color: currentTodo?.color,
            isComplete: isComplete,
        }));
    }

    const setActions = () => {
        if (isEditing) {
            return(
                <div>
                    <select className={styles.todoItemActionSelect} onChange={(e) => handleColorChange(e.target.value)} value={currentTodo?.color}>
                        <option>Select Color</option>
                        {Object.keys(TodoColors).map((color, index) => {
                            return <option key={index}>{color}</option>
                        })}
                    </select>
                    <button className={styles.todoItemActionButton} onClick={() => dispatch(removeTodo(props.todo.id))}>
                        Remove
                    </button>
                    <button className={styles.todoItemActionButton} onClick={() => handleSaveClick()}>
                        Save
                    </button>
                </div>
            );
        } else {
            return(
                <div>
                    <button className={styles.todoItemActionButton} onClick={() => handleEditClick()}>
                        Edit
                    </button>
                </div>
            );
        }
    }

    const setMessage = (todo: TodoItem) => {
        if (isEditing) {
            return(
                <input onChange={(e) => handleInputChange(e.target.value)} value={currentTodo?.message ? currentTodo?.message : props.todo.message} />
            );
        } else {
            return(
                <p>{todo.message}</p>
            );
        }
    }

    return (
        <li key={props.todo.id} style={{color: props.todo.color}} className={todoListItemClassName}>
            <input className={styles.todoItemCheckbox} type="checkbox" onChange={(e) => handleCheckboxClick(e.target.checked)} />
            <div className={styles.todoItemMessage}>
                {setMessage(props.todo)}
            </div>
            <div className={styles.todoItemActions}>
                {setActions()}
            </div>
       </li>
    );
}

export default TodoListItem;
