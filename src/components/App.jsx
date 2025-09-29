
// Style and Images Import
import '../styles/App.css'
import plusIcon from '../assets/plus-icon.svg'
import penIcon from '../assets/pen-icon.svg'
import trashIcon from '../assets/trash-icon.svg'

export default function App() {

    return (
        <div className="center">
            <div className="container">
                {/* Your App Title */}
                <h1 className="app-title">Your Tasks</h1>

                {/* Todo List Task Input Form */}
                <form action="#" method="post" id="form-todo">
                    <input type="text" name="todo-task" id="todo-task" autoComplete="off" placeholder="Add new Task" />
                    <button type="submit">
                        <img src={plusIcon} className="btn-icon" alt="btn plus icon" />
                    </button>
                </form>

                {/* Todo List Container */}
                <div className="todo-list-container">
                    <ul className="todo">
                        <li className="todo-list-item">
                            <input type="checkbox" name="todo-item-cbox" id="todo-item-cbox-1" />
                            <span>React Learning</span>
                            <button type="button" className="edit-item">
                                <img src={penIcon} className="btn-icon" alt="btn pen icon" />
                            </button>
                            <button type="button" className="delete-item">
                                <img src={trashIcon} alt="btn trash icon" />
                            </button>
                        </li>
                        <li className="todo-list-item">
                            <input type="checkbox" name="todo-item-cbox" id="todo-item-cbox-1" />
                            <span>React Learning</span>
                            <button type="button" className="edit-item">
                                <img src={penIcon} className="btn-icon" alt="btn pen icon" />
                            </button>
                            <button type="button" className="delete-item">
                                <img src={trashIcon} alt="btn trash icon" />
                            </button>
                        </li>
                        <li className="todo-list-item">
                            <input type="checkbox" name="todo-item-cbox" id="todo-item-cbox-1" />
                            <span>React Learning</span>
                            <button type="button" className="edit-item">
                                <img src={penIcon} className="btn-icon" alt="btn pen icon" />
                            </button>
                            <button type="button" className="delete-item">
                                <img src={trashIcon} alt="btn trash icon" />
                            </button>
                        </li>
                        <li className="todo-list-item">
                            <input type="checkbox" name="todo-item-cbox" id="todo-item-cbox-1" />
                            <span>React Learning</span>
                            <button type="button" className="edit-item">
                                <img src={penIcon} className="btn-icon" alt="btn pen icon" />
                            </button>
                            <button type="button" className="delete-item">
                                <img src={trashIcon} alt="btn trash icon" />
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Reminder of remaining task to finish */}
                <div className="remaining-todo">
                    <p>Your remaining todos: <span>0</span></p>
                </div>
            </div>
        </div>
    )

}