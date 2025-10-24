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
    const dispatch = useTasksDispatch();

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

    function handleConfirmDeleteModal(){
        dispatch({
            type: 'delete',
            id: modalIsOpen.id,
        });
        handleCloseModal();
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
                                task={task}
                                handleDelete={handleOpenModal}
                                handleError={handleListItemError}
                            />
                        ))
                    }
                </ul>
            </div>
            
            {/* List Item Components */}
            {
                modalIsOpen.show && createPortal(
                    <Modal onClose={handleCloseModal} onCancel={handleCloseModal} onConfirm={handleConfirmDeleteModal}/>,
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