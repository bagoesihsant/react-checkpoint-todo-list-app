// Import Components
import { AddTask } from './AddTask';
import { TasksList } from './TasksList';

// Import Context Provider
import { TasksProvider } from '../contexts/TasksProvider';

// Import Datas
import { initialTasks } from '../datas/datas';

// Import react hooks
import { useState } from 'react';

// Import Styles and Images
import '../styles/App.css';

// TODO
// 1. Move modal from parent state to each component state (preferable to list item)
// 2. Considering using reducer and dispatch for tasks state
// 3. 

// Mental Note
// 1. The Reason as to why extracting add task form into its own component is as is:
// 1.1. After consideration, that component require its own state, and tasks state
// 1.2. That component need to be extracted to allow usage of reducer in this application
// 2. The reason we using reducer and context is as is
// 2.1. To reduce props usage in List Item Component
// 2.2. To group up the tasks state methods into one

export default function App() {

    // Main States of Parent Component
    const [tasks, setTasks] = useState(initialTasks)

    return (
        <div className="center">
            <div className="container">
                {/* Your App Title */}
                <h1 className="app-title">Your Tasks</h1>

                <TasksProvider>
                    <AddTask />
                    <TasksList />
                </TasksProvider>

                {/* Reminder of remaining task to finish */}
                <div className="remaining-todo">
                    <p>Your remaining todos: <span>{tasks.length}</span></p>
                </div>
            </div>
        </div>
    )

}