"use client"

import React, { useState, useEffect } from 'react';
import NewTask from './NewTask';
import TaskItem from './TaskItem';
import { collection, query, onSnapshot, doc, updateDoc, addDoc, deleteDoc, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';


//import { v4 as uuidv4 } from 'uuid';



type Task = {
  id: string;
  text: string;
  isCompleted: boolean;
};

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    //Create task
    const createTask = async (text: string) => {
        try {
            // Create a new task object without an ID
            const newTask = {
                text,
                isCompleted: false,
                createdAt: serverTimestamp()
            };

            // Add a new document in Firestore
            await addDoc(collection(db, 'tasks'), newTask);

        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };


    //Read task from firebase
    useEffect(() => {
        // Set up the Firestore subscription
        const q = query(collection(db, 'tasks'), orderBy('createdAt'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let tasksArr: Task[] = [];
            querySnapshot.forEach((doc) => {
                const taskData = doc.data() as Task;
                tasksArr.push({ ...taskData, id: doc.id });
            });
            setTasks(tasksArr);  // Update the state with the fetched tasks
        });
    
        // Return a cleanup function
        return () => unsubscribe();  // This is the cleanup function for unsubscribing
    }, []);

    //Update(edit) tasks in firebase
    const editTask = async (id: string, newText: string) => {
        // Create a reference to the task document
        const taskDocRef = doc(db, 'tasks', id);
    
        try {
            // Update the document in Firestore
            await updateDoc(taskDocRef, { text: newText });
    
            // Update the task in the local state
            setTasks(prevTasks =>
                prevTasks.map(task => 
                    task.id === id ? {...task, text: newText } : task
                )
            );
        } catch (error) {
            // Handle any errors
            console.error("Error updating document: ", error);
        }
    };

    //Toggle Complete
    const toggleComplete =async (id: string) => {
      try{
        // Find the task to be updated in the local state
        const taskToToggle = tasks.find(task => task.id === id);
        if(!taskToToggle){
            throw new Error('Task not found');
        }

        // Calculate the new completion status
        const newIsCompleted = !taskToToggle.isCompleted;
        // Create a reference to the task document
        const taskDocRef = doc(db, 'tasks', id);
        // Update the document in Firestore
        await updateDoc(taskDocRef, { isCompleted: newIsCompleted });
        // Update the task in the local state
        setTasks(prevTasks =>
            prevTasks.map(task => 
                task.id === id ? {...task, isCompleted: newIsCompleted} : task
            )
        );
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    };


    //Delete task
    const deleteTask = async (id: string) => {
        try {
            // Create a reference to the task document
            const taskDocRef = doc(db, 'tasks', id);
    
            // Delete the document from Firestore
            await deleteDoc(taskDocRef);
    
            // Update the local state to remove the task
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            // Handle any errors
            console.error("Error deleting document: ", error);
        }
    };

    return(
        <div>
            <h1>To-Do List</h1>
            <NewTask createTask={createTask} />
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