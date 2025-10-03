// Import React Hooks
import { useState } from "react"

// Import React Component
import { Input } from "./Input"
import { Button } from "./Button"

// Import Styles and Images
import penIcon from '../assets/pen-icon.svg'
import trashIcon from '../assets/trash-icon.svg'
import checkIcon from '../assets/check-icon.svg'
import crossIcon from '../assets/cross-icon.svg'

export function ListItem({itemClass, taskId, taskDesc, onDelete, updateData}){

    const [isEdit, setIsEdit] = useState({
        cond: false,
        id: null
    })
    const [editTask, setEditTask] = useState(taskDesc)

    function handleToggleEdit(){
        setIsEdit({
            cond: !isEdit.cond,
            id: taskId
        })
    }

    function handleEditChange(event){
        setEditTask(event.target.value)
    }

    function handleToggleFinishEdit(){
        setIsEdit({
            cond: !isEdit.cond,
            id: taskId
        })
        updateData(taskId, editTask)
    }

    function handleToggleCancelEdit(){
        setIsEdit({
            cond: false,
            id: null
        })
        setEditTask(taskDesc)
    }

    return (
        <li className={itemClass}>
            <Input inputType="checkbox" inputName="todo-item-cbox" inputId={`todo-item-cbox-${taskId}`} />
            { 
                !isEdit.cond ? 
                (<span>{taskDesc}</span>) : 
                (
                    <Input 
                        inputType="text" 
                        inputName={`edit-task-${taskId}`} 
                        inputId={`edit-task-${taskId}`} 
                        value={editTask}
                        handleChange={handleEditChange}
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
                    <Button btnType="button" btnClass="delete-item" handleClick={() => onDelete(taskId)}>
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