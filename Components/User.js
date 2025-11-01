const userCard = user => ({
	tag: 'div',
	attributes: { class: 'user-card' },
	children: [
		{ tag: 'h3', attributes: { class: 'user-card__name' }, content: user.name },
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
			children: [
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
				...(user.isCustom
					? [
							{
								tag: 'button',
								attributes: { class: 'btn btn--danger btn--small' },
								content: 'Удалить',
								listeners: {
									click: () => {
										const customUsers = JSON.parse(
											localStorage.getItem('customUsers') || '[]'
										).filter(u => u.id !== user.id)
										localStorage.setItem(
											'customUsers',
											JSON.stringify(customUsers)
										)
										const main = document.querySelector('main')
										render(usersStruct(), main)
									},
								},
							},
					  ]
					: []),
			],
		},
	],
})
