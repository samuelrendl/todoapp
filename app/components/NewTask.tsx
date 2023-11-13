import React, {useState} from 'react';

type AddTaskProps = {
    addTask: (text: string) => void;
};

const NewTask: React.FC<AddTaskProps> = ({addTask}) => {

    const [text, setText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!text.trim()) return;
        addTask(text);
        setText('');
        
    };

    return(
        <div> 
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder='Add new task..' 
                name="newTaskItem"
                value={text} 
                onChange={handleChange}
                aria-label='Add task input'
                autoComplete='off'
                 />
                <button type='submit' aria-label='Add new task' >Add Task</button>
            </form>
        </div>
    )
};

export default NewTask;