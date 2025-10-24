// Import React Hooks
import { useReducer, useContext } from "react";

// Import Context
import { TasksContext, TasksDispatchContext } from "./TasksContext";

// Import Reducer Function(s) Neccesities
// Import Datas
import { initialTasks } from '../datas/datas'

export function TasksProvider({children}){

    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    return (
        <>
            <TasksContext value={tasks}>
                <TasksDispatchContext value={dispatch}>
                    {children}
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

// Reducer Function
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

        default: {
            throw Error(`Unknown Action: ${action.type}`);
        }

    }

}