import { useState, useEffect } from 'react'
import Task from './components/Tasks'
import Notification from './components/Notification'
import './App.css'
import axios from 'axios'

function App() {
	const [tasks, setTasks] = useState([])
	const [newTask, setNewTask] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	useEffect(() => {
		axios
			.get('http://localhost:3000/tasks')
			.then(initialTasks => {
				setTasks(initialTasks.data)
			})
	}, [])

	const addTask = (event) => {
		event.preventDefault()
		const taskObject = {
			content: newTask,
			id: tasks.length + 1,
		}
		axios
			.post('http://localhost:3000/tasks', taskObject)
		setTasks(tasks.concat(taskObject))
		setNewTask('')
	}

	const handleTaskChange = (event) => {
		setNewTask(event.target.value)
	}

	const deleteTaskOf = id => {
		const task = tasks.find(n => n.id === id)

		axios
			.delete(`http://localhost:3000/tasks/${id}`)
			.then(() => {
				setTasks(tasks.filter(n => n.id !== id))
			})
			.catch(() => {
				setErrorMessage(
					`Task '${task.content}' was already removed from the server`
				)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
				setTasks(tasks.filter(n => n.id !== id))
			})
	}



	return (
		<div className="App">
			<Notification message={errorMessage} />
			<ul>
				{tasks.map(task =>
					<Task
						key={task.id}
						task={task.content}
						deleteTask={() => deleteTaskOf(task.id)}
					/>
				)}
			</ul>
			<form onSubmit={addTask}>
				<input value={newTask} onChange={handleTaskChange} />
				<button type='submit'>save</button>
			</form>
		</div>
	)
}

export default App
