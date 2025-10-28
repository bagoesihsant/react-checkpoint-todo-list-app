// Import Components
import { ListItem } from './ListItem';
import { Modal } from './Modal';

// Import Context
import { 
    useTasks, 
    useTasksDispatch,
    useFilterTasks,
} from '../contexts/TasksProvider';

// Import react hooks
import { useState } from 'react';
import { createPortal } from 'react-dom';

// Import React Libraries
import { toast } from 'react-toastify';

export function TasksList(){

    const tasks = useTasks();
    const dispatch = useTasksDispatch();
    const filterTasksStatus = useFilterTasks();

    const filterTasks = () => {
        switch(filterTasksStatus) {

            case 'finished' : {
                return tasks.filter(task => task.finished === true);
            }

            case 'unfinished' : {
                return tasks.filter(task => task.finished === false);
            }

            default: {
                return tasks;
            }

        }
    }

    const filteredTasks = filterTasks();

    const [modalIsOpen, setModalIsOpen] = useState({
        show: false,
        id: null
    });

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
        try {
            dispatch({
                type: 'delete',
                id: modalIsOpen.id,
            });
            handleCloseModal();
            toast.success('Task deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch(error) {
            toast.error(`Failed to Delete Task: ${error}`, {
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

    return (
        <>
            {/* Todo List Container */}
            <div className="todo-list-container">
                <ul className="todo">
                    {
                        filteredTasks.map(task => (
                            <ListItem 
                                key={task.id} 
                                task={task}
                                handleDelete={handleOpenModal}
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
        </>
    )

}