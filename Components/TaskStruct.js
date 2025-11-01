const taskStruct = task => ({
	tag: 'div',
	attributes: { class: 'task' },
	children: [
		{ tag: 'h3', attributes: { class: 'task__title' }, content: task.title },
		{ tag: 'p', attributes: { class: 'task__user' }, content: task.user },
		{ tag: 'p', attributes: { class: 'task__status' }, content: task.status },
		{
			tag: 'p',
			attributes: { class: 'task__description' },
			content: task.description,
		},
	],
})

export { taskStruct }
