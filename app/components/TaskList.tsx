"use client"

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NewTask from './NewTask';
import TaskItem from './TaskItem';


type Task = {
  id: string;
  text: string;
  isCompleted: boolean;
};

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (text: string) => {
        const newTask: Task = {
            id: uuidv4(),
            text,
            isCompleted: false
        };
        setTasks(prevTasks => [newTask, ...prevTasks]);
    };

    const toggleComplete = (id: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task => 
                task.id === id ? {...task, isCompleted: !task.isCompleted} : task
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const editTask = (id: string, newText: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task => 
                task.id === id ? {...task, text: newText } : task
            )
        );
    };

    return(
        <div>
            <h1>To-Do List</h1>
            <NewTask addTask={addTask} />
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    toggleComplete={toggleComplete}
                    deleteTask={deleteTask}
                    editTask={editTask} 
                />
            ))}
        </div>
    )
};

export default TaskList;