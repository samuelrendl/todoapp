import React, { useState, ChangeEvent, KeyboardEventHandler } from 'react';

type TaskItemProps = {
    task: {
        id: string;
        text: string;
        isCompleted: boolean;
    };
    toggleComplete: (id: string) => void;
    deleteTask: (id: string) => void;
    editTask: (id: string, newText: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleComplete, deleteTask, editTask }) => {

    const handleComplete = () => {
        toggleComplete(task.id);
    };

    const handleDelete = () => {
        deleteTask(task.id);
    };


    const [isEditing, setIsEditing] = useState(false);
    
    const handleEdit = () => {
        setIsEditing(true);
    };

    const [editText, setEditText] = useState(task.text);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value);
    };

    const handleSubmitEdit = () => {
        editTask(task.id, editText);
        setIsEditing(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmitEdit();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
            setEditText(task.text);
        }
    };

    const handleClick = () => {
        if (!isEditing) { 
            handleComplete();
        }
    };


    return (
        <div style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
            <input 
                type="checkbox" 
                checked={task.isCompleted} 
                onChange={handleComplete} 
            />
            {isEditing ? (
                <input
                    type='text'
                    value={editText}
                    onChange={handleChange}
                    onBlur={handleSubmitEdit}
                    onKeyDown={handleKeyPress}
                    autoFocus
                />
            ) : (
                // <span onClick={handleClick} onDoubleClick={handleEdit} className="cursor-pointer">{task.text}</span>
                <span onClick={handleClick} className="cursor-pointer">{task.text}</span>
            )}
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default TaskItem;

