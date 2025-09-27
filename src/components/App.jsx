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
                <div className="todo-body">
                    <div className="task-card">
                        <div className="card-body">
                            <div className="task">
                                <h1>Client Review & Feedback</h1>
                                <p>Crypto Wallet Redesign</p>
                            </div>
                            <div className="round">
                                <input type="checkbox" name="task-check" id="task-check" />
                                <label htmlFor="task-check"></label>
                            </div>
                        </div>
                        <div className="card-footer">
                            <span className="date">Today</span>
                            <span className="time">10:00 PM - 11:45 PM</span>
                        </div>
                    </div>
                    <div className="task-card">
                        <div className="card-body">
                            <div className="task">
                                <h1>Client Review & Feedback</h1>
                                <p>Crypto Wallet Redesign</p>
                            </div>
                            <div className="round">
                                <input type="checkbox" name="task-check" id="task-check" />
                                <label htmlFor="task-check"></label>
                            </div>
                        </div>
                        <div className="card-footer">
                            <span className="date">Today</span>
                            <span className="time">10:00 PM - 11:45 PM</span>
                        </div>
                    </div>
                    <div className="task-card">
                        <div className="card-body">
                            <div className="task">
                                <h1>Client Review & Feedback</h1>
                                <p>Crypto Wallet Redesign</p>
                            </div>
                            <div className="round">
                                <input type="checkbox" name="task-check" id="task-check" />
                                <label htmlFor="task-check"></label>
                            </div>
                        </div>
                        <div className="card-footer">
                            <span className="date">Today</span>
                            <span className="time">10:00 PM - 11:45 PM</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}