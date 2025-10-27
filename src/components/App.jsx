// Import Components
import { AddTask } from './AddTask';
import { TasksList } from './TasksList';
import { FilterTasks } from './FilterTasks';

// Import Context Provider
import { TasksProvider } from '../contexts/TasksProvider';
import { ToastContainer } from 'react-toastify';

// Import Styles and Images
import '../styles/App.css';
import { TasksCount } from './TasksCount';

export default function App() {

    return (
        <div className="center">
            <div className="container">
                {/* Your App Title */}
                <h1 className="app-title">Your Tasks</h1>

                <TasksProvider>
                    <AddTask />
                    <FilterTasks />
                    <TasksList />
                    <TasksCount />
                    <ToastContainer />
                </TasksProvider>

            </div>
        </div>
    )

}