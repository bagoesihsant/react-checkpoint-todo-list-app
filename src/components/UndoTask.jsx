export function UndoTask({closeToast, data}){

    const taskDispatch = data.taskDispatcher;
    const undoDispatch = data.undoTaskDispatcher;

    return (
        <div className="msg-container">
            <p className="msg-text">
                Are you sure you want to delete task { data.task }?
            </p>
            <div className="msg-confirm-container">
                <button className="yes" onClick={closeToast}>Yes</button>
                <button className="no" onClick={() => {
                    try {
                        taskDispatch({
                            type: 'add',
                            id: data.id,
                            task: data.task,
                            category: data.category,
                            finished: data.finished,
                        });
                        undoDispatch({type: 'delete'});
                        clearTimeout(data.timeoutId);
                        closeToast();
                    } catch (error) {
                        console.log(error);
                    }
                }}>No</button>
            </div>
        </div>
    );

}