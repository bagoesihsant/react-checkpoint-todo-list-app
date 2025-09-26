import '../styles/App.css'

export default function App() {

    return (
        <div className="container">
            <div className="todo-app">
                <div className="todo-header">
                    <nav className="header-navigator">
                        <button>
                            Messages
                        </button>
                        <button className='active'>
                            Today's Task
                        </button>
                        <button>
                            Last Activity
                        </button>
                    </nav>
                    <div className="add-task">
                        <div className="dates">
                            <h2>Today's Task</h2>
                            <p>Wednesday, 11 May</p>
                        </div>
                        <div className="add">
                            <button>New Task</button>
                        </div>
                    </div>
                    <div className="remaining-tasks">
                        <p className="all active">
                            All <span>35</span>
                        </p>
                        <p className="open">
                            Open <span>14</span>
                        </p>
                        <p className="closed">
                            Closed <span>19</span>
                        </p>
                        <p className="archived">
                            Archived <span>2</span>
                        </p>
                    </div>
                </div>
                <div className="todo-body"></div>

            </div>
        </div>
    )

}