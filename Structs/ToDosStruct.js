import { usersData } from './UsersStruct.js'
import { taskStruct } from '../Components/TaskStruct.js'
import { todosData } from '../Data/todosData.js'
import render from '../Generator/generator.js'

const getAllUsers = () => {
	const customUsers = JSON.parse(localStorage.getItem('customUsers') || '[]')
	return [...usersData, ...customUsers]
}

const todosStruct = (userId, filteredData) => {
	const allUsers = getAllUsers()
	const user = allUsers.find(u => u.id === Number(userId))

	const savedTasks = JSON.parse(localStorage.getItem('customTasks') || '[]')
	const userSavedTasks = savedTasks.filter(t => t.userId == userId)

	const filteredTasks = filteredData || [
		...todosData.filter(t => t.userId == Number(userId)),
		...userSavedTasks,
	]

	const addTaskButton = {
		tag: 'button',
		attributes: { class: 'btn btn--primary btn--small btn-task' },
		content: 'Добавить задачу',
		listeners: {
			click: () => {
				const title = prompt('Введите название задачи:')
				if (!title) return alert('Название задачи обязательно!')

				const status = prompt(
					'Введите статус задачи (Завершено, В процессе, Ожидает):',
					'Ожидает'
				)
				const description = prompt('Введите описание задачи:', '')

				const newTask = {
					userId: Number(userId),
					id: Date.now(),
					title,
					status: status || 'Ожидает',
					description: description || '',
				}

				const currentCustomTasks = JSON.parse(
					localStorage.getItem('customTasks') || '[]'
				)
				localStorage.setItem(
					'customTasks',
					JSON.stringify([...currentCustomTasks, newTask])
				)

				render(todosStruct(userId), document.querySelector('main'))
			},
		},
	}

	return {
		tag: 'main',
		children: [
			{
				tag: 'h2',
				attributes: { class: 'page-title' },
				content: `Задачи пользователя: ${user ? user.name : 'Неизвестно'}`,
			},
			addTaskButton,
			{
				tag: 'div',
				attributes: { class: 'tasks-grid vertical-list' },
				children: filteredTasks.map(taskStruct),
			},
		],
	}
}

export { todosStruct }
