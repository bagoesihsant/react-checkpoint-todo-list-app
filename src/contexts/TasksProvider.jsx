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
    UndoTasksContext,
    UndoTasksDispatchContext,
} from "./TasksContext";

// Import Utils
import { setLocalItems, getLocalItems } from "../utils/utils";

export function TasksProvider({children}){

    const initialTasks = getLocalItems('userTasks') || [];
    const initialFilter = getLocalItems('userFilterCompletion') || "all";
    const initialCategory = getLocalItems('userFilterCategory') || "all";

    const [tasks, tasksDispatch] = useReducer(tasksReducer, initialTasks);
    const [filterTasks, filterTasksDispatch] = useReducer(filterTasksReducer, initialFilter);
    const [categoryTasks, categoryTasksDispatch] = useReducer(categoryTasksReducer, initialCategory);
    const [undoTask, undoTaskDispatch] = useReducer(undoTaskReducer, {});

    useEffect(() => {
        setLocalItems('userTasks', tasks);
    }, [tasks]);

    useEffect(() => {
        setLocalItems('userFilterCompletion', filterTasks);
    }, [filterTasks]);

    useEffect(() => {
        setLocalItems('userFilterCategory', categoryTasks);
    }, [categoryTasks]);

    useEffect(() => {
        console.log("Undo Task is added");
        console.log(undoTask);
    }, [undoTask]);

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

export function useUndoTasks(){
    return useContext(UndoTasksContext);
}

export function useUndoTasksDispatcher() {
    return useContext(UndoTasksDispatchContext);
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

// Undo Task Reducer
function undoTaskReducer(task, action) {

    switch(action.type) {

        case 'add' : {
            return {
                ...task,
                task: action.task
            }
        }

        case 'delete' : {
            return {}
        }

    }

}