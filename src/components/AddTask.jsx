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
        const userInput = formData.get('todo-task')

        // Perform validation
        if (!validateUserInput(userInput).cond) {
            setTask('');
            toast.error(`Failed to Add Task: ${validateUserInput(userInput).message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
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
            });
            setTask('');
            setTaskInputError('');
            toast.success('Task added', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
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
                <Button btnType="submit" btnClass="submit-form">
                    <img src={plusIcon} className="btn-icon" alt="btn plus icon" />
                </Button>
            </Form>
        </>
    )

}

