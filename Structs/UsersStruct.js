import { usersData } from '../Data/usersData.js'
import render from '../Generator/generator.js'

const userCard = user => {
	const actions = [
		{
			tag: 'a',
			attributes: {
				href: `#users#${user.id}#todos`,
				class: 'btn btn--primary btn--small',
			},
			content: 'Задачи',
		},
		{
			tag: 'a',
			attributes: {
				href: `#users#${user.id}#posts`,
				class: 'btn btn--secondary btn--small',
			},
			content: 'Посты',
		},
	]

	// Добавляем кнопку удаления только для своих пользователей
	if (user.isCustom) {
		actions.push({
			tag: 'button',
			attributes: { class: 'btn btn--danger btn--small' },
			content: 'Удалить',
			listeners: {
				click: () => {
					const stored = JSON.parse(localStorage.getItem('customUsers') || '[]')
					const filtered = stored.filter(u => u.id !== user.id)
					localStorage.setItem('customUsers', JSON.stringify(filtered))
					render(usersStruct(), document.querySelector('main'))
				},
			},
		})
	}

	return {
		tag: 'div',
		attributes: { class: 'user-card' },
		children: [
			{
				tag: 'h3',
				attributes: { class: 'user-card__name' },
				content: user.name,
			},
			{
				tag: 'p',
				attributes: { class: 'user-card__position' },
				content: user.position,
			},
			{
				tag: 'p',
				attributes: { class: 'user-card__email' },
				content: `📧 ${user.email}`,
			},
			{
				tag: 'p',
				attributes: { class: 'user-card__phone' },
				content: `📞 ${user.phone}`,
			},
			{
				tag: 'div',
				attributes: { class: 'user-card__actions' },
				children: actions,
			},
		],
	}
}

const usersStruct = () => {
	// Получаем сохранённых пользователей
	const customUsers = JSON.parse(localStorage.getItem('customUsers') || '[]')
	const allUsers = [...usersData, ...customUsers]

	return {
		tag: 'main',
		children: [
			{
				tag: 'div',
				attributes: { class: 'users-header' },
				children: [
					{
						tag: 'h2',
						attributes: { class: 'page-title' },
						content: 'Пользователи',
					},
					{
						tag: 'button',
						attributes: { class: 'btn btn--primary btn--add-user' },
						content: 'Добавить пользователя',
						listeners: {
							click: () => {
								const name = prompt('Имя пользователя:')
								const email = prompt('Email пользователя:')
								const position = prompt('Должность:')
								const phone = prompt('Телефон:')

								if (name && email) {
									const newUser = {
										id: Date.now(),
										name,
										email,
										position: position || '',
										phone: phone || '',
										isCustom: true,
									}

									const stored = JSON.parse(
										localStorage.getItem('customUsers') || '[]'
									)
									stored.push(newUser)
									localStorage.setItem('customUsers', JSON.stringify(stored))

									render(usersStruct(), document.querySelector('main'))
								}
							},
						},
					},
				],
			},
			{
				tag: 'div',
				attributes: { class: 'users-grid' },
				children: allUsers.map(userCard),
			},
		],
	}
}

export { usersStruct, usersData }
