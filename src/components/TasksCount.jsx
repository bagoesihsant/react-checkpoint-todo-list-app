// Import Context
import { useTasks } from "../contexts/TasksProvider";

export function TasksCount(){

    const tasks = useTasks();
    const unfinishedTasks = tasks.filter(task => task.finished === false);

    return (
        <>
            <div className="remaining-todo">
                <p>Your remaining todos: <span>{unfinishedTasks.length}</span></p>
            </div>
        </>
    )
}