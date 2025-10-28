// Import Context Provider
import {
    useCategoryTasks, 
    useCategoryTasksDispatch
 } from "../contexts/TasksProvider";

export function SortTasks(){

    const tasks = useCategoryTasks();
    const dispatch = useCategoryTasksDispatch();

    return(
        <div className="sort-button-container">
            <button
                onClick={() => {
                    dispatch({type: 'all',});
                }}
                className={
                    tasks === 'all' ? 'active' : null
                }
            >
                All
            </button>
            <button
                onClick={() => {
                    dispatch({type: 'personal'});
                }}
                className={
                    tasks === 'personal' ? 'active' : null
                }
            >
                Personal
            </button>
            <button
                onClick={() => {
                    dispatch({type: 'work'});
                }}
                className={
                    tasks === 'work' ? 'active' : null
                }
            >
                Work
            </button>
        </div>
    )

}