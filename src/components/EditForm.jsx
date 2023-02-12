import { useState, useEffect } from 'react'

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
	const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.content)

	useEffect(() => {
		const closeModalIfEscaped = (e) => {
			e.key === 'Escape' && closeEditMode()
		}
		window.addEventListener('keydown', closeModalIfEscaped)

		return () => {
			window.removeEventListener('keydown', closeModalIfEscaped)
		}
	}, [closeEditMode])

	const handleFormSubmit = (e) => {
		e.preventDefault()
		updateTask({ ...editedTask, content: updatedTaskName })
	}

	return (
		<div
			role="dialog"
			aria-labelledby="editTask"
			onClick={(e) => {e.target === e.currentTarget && closeEditMode()}}>
			<form
				className="todo"
				onSubmit={handleFormSubmit}
			>
				<div className="wrapper">
					<input type="text"
						id="editTask"
						className="input"
						value={updatedTaskName}
						onInput={(e) => setUpdatedTaskName(e.target.value)}
						required
						autoFocus
						maxLength={60}
						placeholder="Update Task"
					/>
					<label
						htmlFor="editTask"
						className="label"
					>
					Update Task
					</label>
				</div>
				<button
					className="btn"
					aria-label={`Confirm edited task to now read ${updatedTaskName}`}
					type="submit"
				>
				Submit
				</button>
			</form>
		</div>
	)
}
export default EditForm