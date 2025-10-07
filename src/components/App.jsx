// Import Components
import { Form } from './Form'
import { Input } from './Input'
import { Button } from './Button'
import { ListItem } from './ListItem'
import { Modal } from './Modal'

// Import react hooks
import { useState } from 'react'
import { createPortal } from 'react-dom'

// Import Styles and Images
import '../styles/App.css'
import plusIcon from '../assets/plus-icon.svg'

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
    const [modalIsOpen, setModalIsOpen] = useState({
        show: false,
        id: null
    })
    const [inputError, setInputError] = useState('')

    function validateUserInput(string) {

        if (!string.trim()) return { cond: false, message: "Input can't be empty." }

        if (!regex.test(string)) return { cond: false, message: "Input contain prohibited character(s)." }

        return { cond: true, message: '' }
    }

    function getLatestId(){
        return (tasks.length < 1) ? 0 : tasks.reduce((prev, current) => (prev && prev.id > current.id) ? prev.id : current.id, {}) 
    }

    function handleInputChange(event) {
        setTask(event.target.value)
    }

    function handleOpenModal(taskId) {
        setModalIsOpen({
            show: true,
            id: taskId
        })
    }

    function handleCloseModal() {
        setModalIsOpen({
            show: false,
            id: null
        })
    }

    function handleCancelModal() {
        setModalIsOpen({
            show: false,
            id: null
        })
    }

    function handleConfirmDeleteModal(){
        const newTasks = tasks.filter(task => task.id !== modalIsOpen.id)
        setTasks(newTasks)
        setModalIsOpen({
            show: false,
            id: null
        })
    }

    function handleUpdateData(taskId, taskDesc) {
        // Ambil data spesifik
        const selectedData = tasks.filter(task => task.id === taskId)

        // Update data spesifik
        const updateData = {
            ...selectedData[0], task: taskDesc
        }

        // Ambil tasks tanpa data spesifik
        const filterTasks = tasks.filter(task => task.id !== taskId)

        // Merge tasks dan data baru
        const updatedTasks = [...filterTasks, updateData].sort((prev, next) => prev.id - next.id)

        // Update state
        setTasks(updatedTasks)

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
            setInputError(validateUserInput(userInput).message)
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
        setInputError('')
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
                    <Button btnType="submit" btnClass="submit-form">
                        <img src={plusIcon} className="btn-icon" alt="btn plus icon" />
                    </Button>
                </Form>

                {/* Error Message for wrong user input */}
                { inputError && (<p id='form-error-msg' className='form-error-msg'>{inputError}</p>) }

                {/* Todo List Container */}
                <div className="todo-list-container">
                    <ul className="todo">
                        {
                            tasks.map(task => (
                                <ListItem 
                                    key={task.id} 
                                    itemClass="todo-list-item"
                                    taskId={task.id}
                                    taskDesc={task.task}
                                    onDelete={handleOpenModal}
                                    updateData={handleUpdateData}
                                />
                            ))
                        }
                    </ul>
                </div>

                {/* Reminder of remaining task to finish */}
                <div className="remaining-todo">
                    <p>Your remaining todos: <span>{tasks.length}</span></p>
                </div>
            </div>
            {
                modalIsOpen.show && createPortal(
                    <Modal onClose={handleCloseModal} onCancel={handleCancelModal} onConfirm={handleConfirmDeleteModal}/>,
                    document.body
                )
            }
        </div>
    )

}