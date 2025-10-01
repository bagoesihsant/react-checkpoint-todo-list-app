// Import Components
import { Form } from './Form'
import { Input } from './Input'
import { Button } from './Button'
import { ListItem } from './ListItem'

// Import react hooks
import { useState } from 'react'

// Style and Images Import
import '../styles/App.css'
import plusIcon from '../assets/plus-icon.svg'
import penIcon from '../assets/pen-icon.svg'
import trashIcon from '../assets/trash-icon.svg'
import crossIcon from '../assets/cross-icon.svg'

const dummyTasks = [
    {id: 1, task: 'React Learning', finished: false},
    {id: 2, task: 'HTML CSS Learning', finished: false},
    {id: 3, task: 'SQL Learning', finished: false},
    {id: 4, task: 'JavaScript Learning', finished: false},
]

const regex = new RegExp(/^[a-zA-Z0-9 ]+$/)

export default function App() {

    const [tasks, setTasks] = useState(dummyTasks)
    const [task, setTask] = useState('')

    function validateUserInput(string) {
        return (string === '' || !regex.test(string)) ? false : true
    }

    function getLatestId(){
        return (tasks.length < 1) ? 0 : tasks.reduce((prev, current) => (prev && prev.id > current.id) ? prev.id : current.id, {}) 
    }

    function handleInputChange(event) {
        setTask(event.target.value)
    }

    function handleDeleteButton(taskId) {
        const newTasks = tasks.filter(task => task.id !== taskId)
        setTasks(newTasks)
    }

    function handleOpenModal(){
        alert('This will open a modal in the future')
    }

    function handleFormSubmit(event) {
        // Prevent default form behavior from happening
        event.preventDefault()

        // Get form data
        const formData = new FormData(event.target)

        // Get user input
        const userInput = formData.get('todo-task')

        // Perform validation
        if (!validateUserInput(userInput)) {
            alert('Input mengandung karakter yang tidak diijinkan')
            setTask('')
            return false
        }

        // Create Task Object
        const newTask = {
            id: getLatestId()+1,
            task: userInput,
            finished: false
        }

        // Add new Task Object to State
        const newTasks = [...tasks, newTask]
        setTasks(newTasks)
        setTask('')
    }

    return (
        <div className="center">
            <div className="container">
                {/* Your App Title */}
                <h1 className="app-title">Your Tasks</h1>

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
                    <button type="submit" className="submit-form">
                        <img src={plusIcon} className="btn-icon" alt="btn plus icon" />
                    </button>
                </Form>

                {/* Todo List Container */}
                <div className="todo-list-container">
                    <ul className="todo">
                        {
                            tasks.map(task => (
                                <ListItem key={task.id} itemClass="todo-list-item">
                                    <Input inputType="checkbox" inputName="todo-item-cbox" inputId={`todo-item-cbox-${task.id}`} />
                                    <span>{task.task}</span>
                                    <Button btnType="button" btnClass="edit-item">
                                        <img src={penIcon} className="btn-icon" alt="btn pen icon" />
                                    </Button>
                                    <Button btnType="button" btnClass="delete-item" handleClick={handleOpenModal}>
                                        <img src={trashIcon} alt="btn trash icon" />
                                    </Button>
                                </ListItem>
                            ))
                        }
                    </ul>
                </div>

                {/* Reminder of remaining task to finish */}
                <div className="remaining-todo">
                    <p>Your remaining todos: <span>{tasks.length}</span></p>
                </div>
            </div>

            {/* Modal Element */}
            <div className="overlay">
                <div className="modal-container">
                    <div className="modal-header">
                        <button type="button" className="modal-header-close">
                            <img src={crossIcon} alt='btn modal cross'/>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h1>Are you sure you want to delete this item?</h1>
                        <p>
                            Once deleted the item can't be returned, 
                            so make sure to check again before deleting.
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="modal-footer-cancel">
                            Cancel
                        </button>
                        <button type="button" className="modal-footer-confirm">
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}