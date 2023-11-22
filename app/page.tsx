import React, {useState} from 'react';
import TaskList from "./components/TaskList"
export default function Home() {
  return (
    <main>
      <div>
        <h1>To-Do List</h1>
        <TaskList />
      </div>
    </main>
  )
}
