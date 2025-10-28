// Import Context Provider
import { useTasksDispatch } from "../contexts/TasksProvider";

// Import React Libraries
import { toast } from "react-toastify";

export function ClearTasks(){

    const dispatch = useTasksDispatch();

    return(
        <div className="clear-button-container">
            <button
                onClick={() => {
                    try {
                        dispatch({type: 'clear-all'});
                        toast.success('All Tasks Cleared', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    } catch(error) {
                        toast.error('Failed to Clear All Tasks', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    }
                }}
            >
                Clear All Tasks
            </button>
            <button
                onClick={() => {
                    try {
                        dispatch({type: 'clear-finished'});
                        toast.success('Finished Tasks Cleared', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    } catch(error) {
                        toast.error('Failed to Clear All Finished Tasks', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    }
                }}
            >
                Clear Finished Tasks
            </button>
        </div>
    )

}