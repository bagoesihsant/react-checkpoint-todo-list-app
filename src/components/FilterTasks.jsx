import { 
    useFilterTasksDispatch 
} from '../contexts/TasksProvider';

export function FilterTasks(){

    const filterTasksDispatch = useFilterTasksDispatch();

    return (
        <>
            <button onClick={() => {
                filterTasksDispatch({
                    type: 'all',

                })
            }}>
                All
            </button>
            <button onClick={() => {
                filterTasksDispatch({
                    type: 'finished',
                })
            }}>
                Finished
            </button>
            <button onClick={() => {
                filterTasksDispatch({
                    type: 'unfinished',
                })
            }}>
                Unfinished
            </button>
        </>
    )

}