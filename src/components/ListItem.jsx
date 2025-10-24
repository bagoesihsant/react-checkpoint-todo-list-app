// Import React Hooks
import { useState } from "react";

// Import React Component
import { Input } from "./Input";
import { Button } from "./Button";

// Import Utils
import { validateUserInput } from '../utils/utils';

// Import Context
import { useTasksDispatch } from "../contexts/TasksProvider";

// Import Styles and Images
import penIcon from '../assets/pen-icon.svg';
import trashIcon from '../assets/trash-icon.svg';
import checkIcon from '../assets/check-icon.svg';
import crossIcon from '../assets/cross-icon.svg';

export function ListItem({task, handleDelete, handleError}){

    const dispatch = useTasksDispatch();

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
            handleError(validateUserInput(editTask).message);
            return false;
        }
        resetEditInput();
        dispatch({
            type: 'update',
            task: {
                ...task,
                task: editTask,
            }
        });
        handleError('');
    }

    function handleToggleCancelEdit(){
        
        setEditTask(task.task);
        handleError('');
    }

    function handleKeyFinishEdit(event) {

        if (event.code === 'Enter') {
            if (!validateUserInput(editTask).cond) {
                setEditTask(editTask);
                handleError(validateUserInput(editTask).message);
                return false;
            }
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
            <Input inputType="checkbox" inputName="todo-item-cbox" inputId={`todo-item-cbox-${task.id}`} handleChange={handleFinishTask} />
            { 
                !isEdit.cond ? 
                (<span>{task.task}</span>) : 
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
                        <img src={penIcon} className="btn-icon" alt="btn pen icon" />
                    </Button>
                ) : (
                    <Button btnType="button" btnClass="finish-edit-item" handleClick={handleToggleFinishEdit}>
                        <img src={checkIcon} className="btn-icon" alt="btn pen icon" />
                    </Button>
                )
            }
            {
                !isEdit.cond ? (
                    <Button btnType="button" btnClass="delete-item" handleClick={() => handleDelete(task.id)}>
                        <img src={trashIcon} alt="btn trash icon" />
                    </Button>
                ) : (
                    <Button btnType="button" btnClass="cancel-edit-item" handleClick={handleToggleCancelEdit}>
                        <img src={crossIcon} alt="btn cross icon" />
                    </Button>
                )
            }
        </li>
    )

}