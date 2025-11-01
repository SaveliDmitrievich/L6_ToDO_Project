export function getUsers() {
	return JSON.parse(localStorage.getItem('users')) || []
}

export function addUser(user) {
	const users = getUsers()
	const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1
	const newUser = { ...user, id: newId, todos: user.todos || [] }
	users.push(newUser)
	localStorage.setItem('users', JSON.stringify(users))
}

export function deleteUser(userId) {
	let users = getUsers()
	users = users.filter(u => u.id !== userId)
	localStorage.setItem('users', JSON.stringify(users))
}

export function addTodoToUser(userId, todo) {
	const users = getUsers()
	const userIndex = users.findIndex(u => u.id === userId)
	if (userIndex === -1) return

	const newTodo = {
		id: users[userIndex].todos.length
			? Math.max(...users[userIndex].todos.map(t => t.id)) + 1
			: 1,
		...todo,
	}

	users[userIndex].todos.push(newTodo)
	localStorage.setItem('users', JSON.stringify(users))
}
