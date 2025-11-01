const statusColor = status => {
	switch (status) {
		case 'Завершено':
			return '#4caf50'
		case 'В процессе':
			return '#ffb300'
		case 'Ожидает':
			return '#9e9e9e'
		default:
			return '#607d8b'
	}
}

const taskStruct = task => ({
	tag: 'div',
	attributes: {
		class: 'task-card',
		style: `border-left: 6px solid ${statusColor(task.status)};`,
	},
	children: [
		{
			tag: 'h3',
			attributes: { class: 'task-card__title' },
			content: task.title,
		},
		{
			tag: 'p',
			attributes: { class: 'task-card__status' },
			content: `📌 ${task.status}`,
		},
		{
			tag: 'p',
			attributes: { class: 'task-card__description' },
			content: task.description,
		},
	],
})

export { taskStruct }
