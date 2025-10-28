import {
    useFilterTasks, 
    useFilterTasksDispatch,
} from '../contexts/TasksProvider';

export function FilterTasks(){

    const filterTasksStatus = useFilterTasks();
    const filterTasksDispatch = useFilterTasksDispatch();

    return (
        <div className="filter-container">
            <h2>Filter by Completion Status</h2>
            <div className="button-container">
                <button 
                    onClick={() => {
                        filterTasksDispatch({
                            type: 'all',

                        });
                    }}
                    className={
                        filterTasksStatus === 'all' ? 'active' : null
                    }
                >
                    All
                </button>
                <button 
                    onClick={() => {
                        filterTasksDispatch({
                            type: 'finished',
                        });
                    }}
                    className={
                        filterTasksStatus === 'finished' ? 'active' : null
                    }
                >
                    Finished
                </button>
                <button 
                    onClick={() => {
                        filterTasksDispatch({
                            type: 'unfinished',
                        });
                    }}
                    className={
                        filterTasksStatus === 'unfinished' ? 'active' : null
                    }
                >
                    Unfinished
                </button>
            </div>
        </div>
    )

}