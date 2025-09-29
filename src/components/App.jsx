// Import Components
import { Form } from './Form'
import { Input } from './Input'
import { Button } from './Button'
import { ListItem } from './ListItem'


// Style and Images Import
import '../styles/App.css'
import plusIcon from '../assets/plus-icon.svg'
import penIcon from '../assets/pen-icon.svg'
import trashIcon from '../assets/trash-icon.svg'

export default function App() {

    const dummyTasks = [
        {id: 1, task: 'React Learning', finished: false},
        {id: 2, task: 'HTML CSS Learning', finished: false},
        {id: 3, task: 'SQL Learning', finished: false},
        {id: 4, task: 'JavaScript Learning', finished: false},
    ]

    return (
        <div className="center">
            <div className="container">
                {/* Your App Title */}
                <h1 className="app-title">Your Tasks</h1>

                {/* Todo List Task Input Form */}
                <Form action="#" method="post" formId="form-todo">
                    <Input inputType="text" inputName="todo-task" inputId="todo-task" placeholder="Add new Task" />
                    <Button btnType="submit" btnClass="submit-form">
                        <img src={plusIcon} className="btn-icon" alt="btn plus icon" />
                    </Button>
                </Form>

                {/* Todo List Container */}
                <div className="todo-list-container">
                    <ul className="todo">
                        {
                            dummyTasks.map(task => (
                                <ListItem key={task.id} itemClass="todo-list-item">
                                    <Input inputType="checkbox" inputName="todo-item-cbox" inputId={`todo-item-cbox-${task.id}`} />
                                    <span>{task.task}</span>
                                    <Button btnType="button" btnClass="edit-item">
                                        <img src={penIcon} className="btn-icon" alt="btn pen icon" />
                                    </Button>
                                    <Button btnType="button" btnClass="delete-item">
                                        <img src={trashIcon} alt="btn trash icon" />
                                    </Button>
                                </ListItem>
                            ))
                        }
                    </ul>
                </div>

                {/* Reminder of remaining task to finish */}
                <div className="remaining-todo">
                    <p>Your remaining todos: <span>{dummyTasks.length}</span></p>
                </div>
            </div>
        </div>
    )

}