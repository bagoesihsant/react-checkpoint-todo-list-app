// Import React Hooks
import { useState } from "react";

// Import React Libraries
import { toast } from "react-toastify";

// Import React Component
import { Input } from "./Input";
import { Button } from "./Button";

// Import Utils
import { validateUserInput } from '../utils/utils';

// Import Context
import { useTasksDispatch, useTheme } from "../contexts/TasksProvider";

// Import Styles and Images
import penIcon from '../assets/pen-icon.svg';
import trashIcon from '../assets/trash-icon.svg';
import checkIcon from '../assets/check-icon.svg';
import crossIcon from '../assets/cross-icon.svg';

import penDarkIcon from '../assets/pen-dark-icon.svg';
import trashDarkIcon from '../assets/trash-dark-icon.svg';
import checkDarkIcon from '../assets/check-dark-icon.svg';
import crossDarkicon from '../assets/cross-dark-icon.svg';

export function ListItem({task, handleDelete}){

    const dispatch = useTasksDispatch();
    const theme = useTheme();

    const [isEdit, setIsEdit] = useState({
        cond: false,
        id: null
    })
    const [editTask, setEditTask] = useState(task.task);

    function resetEditInput(){
        setIsEdit({
            cond: false,
            id: null
        });
    }

    function handleToggleEdit(){
        setIsEdit({
            cond: !isEdit.cond,
            id: task.id
        });
    }

    function handleEditChange(event){
        setEditTask(event.target.value);
    }

    function handleToggleFinishEdit(){
        if (!validateUserInput(editTask).cond) {
            setEditTask(editTask);
            toast.error(`Failed to Update Task: ${validateUserInput(editTask).message}`, {
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
        
        // Save Data Logic
        try {
            dispatch({
                type: 'update',
                task: {
                    ...task,
                    task: editTask,
                }
            });
            resetEditInput();
            toast.success('Task updated', {
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
            toast.error(`Failed to Update Task : ${error}`, {
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

    function handleToggleCancelEdit(){
        setEditTask(task.task);
        resetEditInput();
        handleError('');
    }

    function handleKeyFinishEdit(event) {
        if (event.code === 'Enter') {
            handleToggleFinishEdit();
        }
    }

    function handleFinishTask(){
        dispatch({
            type: 'update',
            task: {
                ...task,
                finished: !task.finished,
            }
        });
    }

    return (
        <li className="todo-list-item">
            <Input inputType="checkbox" inputName="todo-item-cbox" inputId={`todo-item-cbox-${task.id}`} handleChange={handleFinishTask} checked={task.finished} />
            { 
                !isEdit.cond ? 
                (
                    <>
                        <span>{task.task}</span>
                        <p className="category">{task.category}</p>
                    </>
                ) : 
                (
                    <Input 
                        inputType="text" 
                        inputName={`edit-task-${task.id}`} 
                        inputId={`edit-task-${task.id}`} 
                        value={editTask}
                        handleChange={handleEditChange}
                        handleKeyDown={handleKeyFinishEdit}
                    />
                ) 
            }
            {
                !isEdit.cond ? (
                    <Button btnType="button" btnClass="edit-item" handleClick={handleToggleEdit}>
                        <img src={theme === 'dark' ? penDarkIcon : penIcon} className="btn-icon" alt="btn pen icon" />
                    </Button>
                ) : (
                    <Button btnType="button" btnClass="finish-edit-item" handleClick={handleToggleFinishEdit}>
                        <img src={theme === 'dark' ? checkDarkIcon : checkIcon} className="btn-icon" alt="btn pen icon" />
                    </Button>
                )
            }
            {
                !isEdit.cond ? (
                    <Button btnType="button" btnClass="delete-item" handleClick={() => handleDelete(task.id)}>
                        <img src={theme === 'dark' ? trashDarkIcon : trashIcon} alt="btn trash icon" />
                    </Button>
                ) : (
                    <Button btnType="button" btnClass="cancel-edit-item" handleClick={handleToggleCancelEdit}>
                        <img src={theme === 'dark' ? crossDarkicon : crossIcon} alt="btn cross icon" />
                    </Button>
                )
            }
        </li>
    )

}