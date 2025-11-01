const footerStruct = () => ({
	tag: 'footer',
	attributes: { class: 'footer' },
	children: [
		{
			tag: 'div',
			attributes: { class: 'footer-content' },
			children: [
				{
					tag: 'p',
					attributes: { class: 'footer-copy' },
					content: '© 2025 Reeddix. Все права защищены.',
				},
			],
		},
	],
})

export { footerStruct }
