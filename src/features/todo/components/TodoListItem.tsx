import { useState } from "react";
import { preProcessFile } from "typescript";
import { useAppDispatch } from "../../../app/hooks";
import { removeTodo, TodoColors, TodoItem, updateTodo } from "../todoSlice";

export interface TodoListItemProps {
    todo: TodoItem;
}

const TodoListItem: React.FunctionComponent<TodoListItemProps> = (
    props: TodoListItemProps
) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState<TodoItem>();

    const dispatch = useAppDispatch();

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
        setCurrentTodo({
            ...props.todo,
            message: currentTodo!.message,
            color: color as TodoColors,
        });
    }

    const setActions = () => {
        if (isEditing) {
            return(
                <div>
                    <button onClick={() => dispatch(removeTodo(props.todo.id))}>
                        Remove
                    </button>
                    <button onClick={() => handleSaveClick()}>
                        Save
                    </button>
                    <select onChange={(e) => handleColorChange(e.target.value)} value={currentTodo?.color}>
                        <option>Select Color</option>
                        {Object.keys(TodoColors).map((color, index) => {
                            return <option key={index}>{color}</option>
                        })}
                    </select>
                </div>
            );
        } else {
            return(
                <button onClick={() => handleEditClick()}>
                    Edit
                </button>
            );
        }
    }

    const setMessage = (todo: TodoItem) => {
        if (isEditing) {
            return(
                <div>
                    <input onChange={(e) => handleInputChange(e.target.value)} value={currentTodo?.message ? currentTodo?.message : props.todo.message} />
                </div>
            );
        } else {
            return(
                <div>
                    <p>{todo.message}</p>
                </div>
            );
        }
    }

    return (
        <li key={props.todo.id} style={{color: props.todo.color}}>
            {setMessage(props.todo)}
            {setActions()}
       </li>
    );
}

export default TodoListItem;
