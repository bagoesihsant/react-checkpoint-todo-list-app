// Import Components
import { AddTask } from './AddTask';
import { TasksList } from './TasksList';
import { FilterTasks } from './FilterTasks';
import { ClearTasks } from './ClearTasks';
import { SortTasks } from './SortTasks';
import { ChangeTheme } from './ChangeTheme';

// Import Context Provider
import { TasksProvider } from '../contexts/TasksProvider';
import { ToastContainer } from 'react-toastify';

// Import Styles and Images
import '../styles/App.css';
import { TasksCount } from './TasksCount';

export default function App() {

    return (
        <TasksProvider>
            <div className="center">
                <ChangeTheme/>
                <div className="container">
                    <h1 className="app-title">Your Tasks</h1>
                    <AddTask />
                    <FilterTasks />
                    <SortTasks />
                    <TasksList />
                    <ClearTasks />
                    <TasksCount />
                    <ToastContainer />

                </div>
            </div>
        </TasksProvider>
    )

}