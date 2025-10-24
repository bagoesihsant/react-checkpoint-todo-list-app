// Import Components
import { Form } from './Form'
import { Input } from './Input'
import { Button } from './Button'

// Import Utils
import { validateUserInput, getLatestId } from '../utils/utils'

// Import React hooks
import { useState } from 'react'

// Import styling and images
import plusIcon from '../assets/plus-icon.svg'

export function AddTask({tasks, handleTasks}){

    const [task, setTask] = useState('');
    const [taskInputError, setTaskInputError] = useState('')

    function handleInputChange(event){
        setTask(event.target.value);
    }

    function handleFormSubmit(event) {
        // Prevent default form behavior from happening
        event.preventDefault()

        // Get form data
        const formData = new FormData(event.target)

        // Get user input
        const userInput = formData.get('todo-task')

        // Perform validation
        if (!validateUserInput(userInput).cond) {
            setTask('')
            setTaskInputError(validateUserInput(userInput).message)
            return false
        }

        // Create Task Object
        const newTask = {
            id: getLatestId(tasks)+1,
            task: userInput,
            finished: false
        }

        // Add new Task Object to State
        const newTasks = [...tasks, newTask]
        handleTasks(newTasks)
        setTask('')
        setTaskInputError('')
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

            {/* Error Message for wrong user input */}
            { taskInputError && (<p id='form-error-msg' className='form-error-msg'>{taskInputError}</p>) }
        </>
    )

}

