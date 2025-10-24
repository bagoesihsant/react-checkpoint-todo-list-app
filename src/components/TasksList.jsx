// Import Components
import { ListItem } from './ListItem';
import { Modal } from './Modal';

// Import Context
import { useTasks, useTasksDispatch } from '../contexts/TasksProvider';

// Import react hooks
import { useState } from 'react';
import { createPortal } from 'react-dom';

export function TasksList(){

    const tasks = useTasks();
    const dispatch = useTasks();

    // List Item State
    const [modalIsOpen, setModalIsOpen] = useState({
        show: false,
        id: null
    });
    const [listItemError, setListItemError] = useState('');

    function handleOpenModal(taskId) {
        setModalIsOpen({
            show: true,
            id: taskId
        });
    }

    function handleCloseModal() {
        setModalIsOpen({
            show: false,
            id: null
        });
    }

    function handleCancelModal() {
        setModalIsOpen({
            show: false,
            id: null
        });
    }

    function handleConfirmDeleteModal(){
        const newTasks = tasks.filter(task => task.id !== modalIsOpen.id);
        handleTasks(newTasks);
        handleCloseModal();
    }

    function handleUpdateData(taskId, taskDesc) {
        // Ambil data spesifik
        const selectedData = tasks.filter(task => task.id === taskId);

        // Update data spesifik
        const updateData = {
            ...selectedData[0], task: taskDesc
        }

        // Ambil tasks tanpa data spesifik
        const filterTasks = tasks.filter(task => task.id !== taskId);

        // Merge tasks dan data baru
        const updatedTasks = [...filterTasks, updateData].sort((prev, next) => prev.id - next.id);

        // Update state
        handleTasks(updatedTasks);
    }

    function handleListItemError(errorMsg){
        setListItemError(errorMsg);
    }


    return (
        <>
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
            
            {/* List Item Components */}
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
        </>
    )

}