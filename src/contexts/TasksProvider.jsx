// Import React Hooks
import { useReducer, useContext, useEffect } from "react";

// Import Context
import { 
    TasksContext, 
    TasksDispatchContext, 
    FilterTasksContext,
    FilterTasksDispatchContext,
} from "./TasksContext";

// Import Utils
import { setLocalItems, getLocalItems } from "../utils/utils";

export function TasksProvider({children}){

    const initialTasks = getLocalItems('userTasks') || [];

    const [tasks, tasksDispatch] = useReducer(tasksReducer, initialTasks);
    const [filterTasks, filterTasksDispatch] = useReducer(filterTasksReducer, "all");

    useEffect(() => {
        setLocalItems('userTasks', tasks);
    }, [tasks]);

    return (
        <>
            <TasksContext value={tasks}>
                <TasksDispatchContext value={tasksDispatch}>
                    <FilterTasksContext value={filterTasks}>
                        <FilterTasksDispatchContext value={filterTasksDispatch}>
                            {children}
                        </FilterTasksDispatchContext>
                    </FilterTasksContext>
                </TasksDispatchContext>
            </TasksContext>
        </>
    )

}

// Created use methods to minimize useContext Import on another Component
export function useTasks(){
    return useContext(TasksContext);
}

export function useTasksDispatch(){
    return useContext(TasksDispatchContext);
}

export function useFilterTasks(){
    return useContext(FilterTasksContext);
}

export function useFilterTasksDispatch(){
    return useContext(FilterTasksDispatchContext);
}

// Tasks Reducer Function
function tasksReducer(tasks, action) {

    switch(action.type) {

        case 'add': {
            return [
                ...tasks,
                {
                    id: action.id,
                    task: action.task,
                    finished: false,
                }
            ];
        }

        case 'update' : {
            return tasks.map(task => {
                if (task.id === action.task.id) {
                    return action.task;
                } else {
                    return task;
                }
            });
        }

        case 'delete' : {
            return tasks.filter(task => task.id !== action.id);
        }

        case 'clear-all' : {
            return [];
        }

        case 'clear-finished' : {
            return tasks.filter(task => task.finished !== true);
        }

        default: {
            throw Error(`Unknown Action: ${action.type}`);
        }

    }

}

// Filter Tasks Reducer
function filterTasksReducer(tasks, action){

    switch(action.type) {

        case 'finished' : {
            return "finished";
        }

        case 'unfinished' : {
            return "unfinished";
        }

        default: {
            return "all";
        }

    }

}