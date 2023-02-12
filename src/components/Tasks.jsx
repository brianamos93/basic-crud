const Task = ({ task, deleteTask, editTask }) => {
	return (
		<li className="task">
			{task}
			<button onClick={editTask}></button>
			<button onClick={deleteTask}>Delete</button>
		</li>
	)
}

export default Task