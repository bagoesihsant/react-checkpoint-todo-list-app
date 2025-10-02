// Import React Hooks
import { useState } from "react"

// Import React Component
import { Input } from "./Input"
import { Button } from "./Button"

// Import Styles and Images
import penIcon from '../assets/pen-icon.svg'
import trashIcon from '../assets/trash-icon.svg'

export function ListItem({itemClass, taskId, taskDesc, onDelete}){

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

    return (
        <li className={itemClass}>
            <Input inputType="checkbox" inputName="todo-item-cbox" inputId={`todo-item-cbox-${taskId}`} />
            { 
                !isEdit.cond ? 
                (<span>{editTask}</span>) : 
                (
                    <Input 
                        inputType="text" 
                        inputName={`edit-task-${taskId}`} 
                        inputId={`edit-task-${taskId}`} 
                        value={taskDesc}
                        handleChange={handleEditChange}
                    />
                ) 
            }
            <Button btnType="button" btnClass="edit-item" handleClick={handleToggleEdit}>
                <img src={penIcon} className="btn-icon" alt="btn pen icon" />
            </Button>
            <Button btnType="button" btnClass="delete-item" handleClick={() => onDelete(taskId)}>
                <img src={trashIcon} alt="btn trash icon" />
            </Button>
        </li>
    )

}