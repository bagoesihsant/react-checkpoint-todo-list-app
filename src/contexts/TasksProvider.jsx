// Import React Hooks
import { useReducer, useContext, useEffect } from "react";

// Import Context
import { 
    TasksContext, 
    TasksDispatchContext, 
    FilterTasksContext,
    FilterTasksDispatchContext,
    CategoryTasksContext,
    CategoryTasksDispatchContext,
} from "./TasksContext";

// Import Utils
import { setLocalItems, getLocalItems } from "../utils/utils";

export function TasksProvider({children}){

    const initialTasks = getLocalItems('userTasks') || [];

    const [tasks, tasksDispatch] = useReducer(tasksReducer, initialTasks);
    const [filterTasks, filterTasksDispatch] = useReducer(filterTasksReducer, "all");
    const [categoryTasks, categoryTasksDispatch] = useReducer(categoryTasksReducer, "all");

    useEffect(() => {
        setLocalItems('userTasks', tasks);
    }, [tasks]);

    return (
        <>
            <TasksContext value={tasks}>
                <TasksDispatchContext value={tasksDispatch}>
                    <FilterTasksContext value={filterTasks}>
                        <FilterTasksDispatchContext value={filterTasksDispatch}>
                            <CategoryTasksContext value={categoryTasks}>
                                <CategoryTasksDispatchContext value={categoryTasksDispatch}>
                                    {children}
                                </CategoryTasksDispatchContext>
                            </CategoryTasksContext>
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

export function useCategoryTasks(){
    return useContext(CategoryTasksContext);
}

export function useCategoryTasksDispatch(){
    return useContext(CategoryTasksDispatchContext);
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
                    category: action.category,
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

// Sort Tasks Reducer
function categoryTasksReducer(tasks, action) {

    switch(action.type) {

        case 'personal': {
            return 'personal';
        }

        case 'work' : {
            return 'work';
        }

        default: {
            return "all";
        }

    }

}