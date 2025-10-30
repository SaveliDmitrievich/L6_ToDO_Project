const userComponent = user => ({
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
			content: user.email,
		},
	],
})

export { userComponent }
