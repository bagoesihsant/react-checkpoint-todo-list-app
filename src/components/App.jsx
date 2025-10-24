// Import Components
import { Form } from './Form'
import { Input } from './Input'
import { Button } from './Button'
import { ListItem } from './ListItem'
import { Modal } from './Modal'

// Import Utils
import { validateUserInput, getLatestId } from '../utils/utils'

// Import Datas
import { initialTasks } from '../datas/datas'

// Import react hooks
import { useState } from 'react'
import { createPortal } from 'react-dom'

// Import Styles and Images
import '../styles/App.css'
import plusIcon from '../assets/plus-icon.svg'
import { AddTask } from './AddTask'

// TODO
// 1. Move modal from parent state to each component state (preferable to list item)
// 2. Considering using reducer and dispatch for tasks state
// 3. 

export default function App() {

    // Main States of Parent Component
    const [tasks, setTasks] = useState(initialTasks)

    // List Item State
    const [modalIsOpen, setModalIsOpen] = useState({
        show: false,
        id: null
    })
    const [listItemError, setListItemError] = useState('')

    // List Item Function(s) start

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

    function handleListItemError(errorMsg){
        setListItemError(errorMsg)
    }

    // List Item Function(s) end

    return (
        <div className="center">
            <div className="container">
                {/* Your App Title */}
                <h1 className="app-title">Your Tasks</h1>

               <AddTask tasks={tasks} handleTasks={setTasks} />

                {/* Todo List Container */}
                <div className="todo-list-container">
                    <ul className="todo">
                        {
                            tasks.map(task => (
                                <ListItem 
                                    key={task.id} 
                                    itemClass="todo-list-item"
                                    task={task}
                                    onDelete={handleOpenModal}
                                    updateData={handleUpdateData}
                                    handleError={handleListItemError}
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
            
            {/* Error Message Modal */}
            {
                listItemError && createPortal(
                    <div className="error-modal">
                        <p>{listItemError}</p>
                    </div>,
                    document.body
                )
            }
        </div>
    )

}