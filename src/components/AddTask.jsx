// Import Components
import { Form } from './Form'
import { Input } from './Input'
import { Button } from './Button'

// Import Utils
import { validateUserInput, getLatestId } from '../utils/utils'

// Import Context
import { useTasks, useTasksDispatch } from '../contexts/TasksProvider'

// Import React hooks
import { useState } from 'react'

// Import React Libraries
import { toast } from 'react-toastify';

// Import styling and images
import plusIcon from '../assets/plus-icon.svg'

export function AddTask(){

    const tasks = useTasks();
    const dispatch = useTasksDispatch();

    const [task, setTask] = useState('');

    function handleInputChange(event){
        setTask(event.target.value);
    }

    function handleFormSubmit(event) {
        // Prevent default form behavior from happening
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.target);

        // Get user input
        const userInput = formData.get('todo-task');
        const taskCategory = formData.get('todo-task-categories');

        // Perform validation
        if (!validateUserInput(userInput).cond) {
            setTask('');
            toast.error(`Failed to Add Task: ${validateUserInput(userInput).message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                pauseOnFocusLoss: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return false;
        }

        // Add new Task Object to State
        try {
            dispatch({
                type: 'add',
                id: getLatestId(tasks)+1,
                task: userInput,
                category: taskCategory,
            });
            setTask('');
            toast.success('Task added', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                pauseOnFocusLoss: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            toast.error(`Failed to Add Task: ${error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                pauseOnFocusLoss: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return(
        <>
            {/* Todo List Task Input Form */}
            <Form 
                action="#"
                method="post" 
                formId="form-todo"
                handleSubmit={handleFormSubmit}
                encType="multipart/form-data"
            >
                <Input 
                    inputType="text" 
                    inputName="todo-task" 
                    inputId="todo-task" 
                    placeholder="Add new Task" 
                    handleChange={handleInputChange}
                    value={task}
                />
                <select id='todo-task-categories' name='todo-task-categories'>
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                </select>
                <Button btnType="submit" btnClass="submit-form">
                    <img src={plusIcon} className="btn-icon" alt="btn plus icon" />
                </Button>
            </Form>
        </>
    )

}

