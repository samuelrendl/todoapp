import React, {useState} from 'react';
import TaskList from "./components/TaskList"
export default function Home() {
  return (
    <main>
      <div>
        <TaskList />
      </div>
    </main>
  )
}
