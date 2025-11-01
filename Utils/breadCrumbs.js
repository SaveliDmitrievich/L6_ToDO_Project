import { parseHash, navigateTo } from './router.js'

export function getBreadcrumbsStructure() {
	const path = parseHash()
	const crumbs = []
	let accumulated = []

	for (let i = 0; i < path.length; i++) {
		const part = path[i]
		const next = path[i + 1]

		if (/^\d+$/.test(part)) continue

		const hasId = /^\d+$/.test(next)
		crumbs.push({ part, id: hasId ? next : null })
	}

	const elements = crumbs.map((item, index) => {
		const isLast = index === crumbs.length - 1

		accumulated.push(item.part)
		if (item.id) accumulated.push(item.id)

		const currentHash = accumulated.join('#')

		return {
			tag: 'span',
			attributes: { class: 'crumb' },
			children: [
				{
					tag: 'span',
					content: getDisplayName(item.part),
					listeners: !isLast
						? { click: () => navigateTo(currentHash) }
						: undefined,
				},
				!isLast
					? {
							tag: 'span',
							attributes: { class: 'crumb__separator' },
							content: ' > ',
					  }
					: null,
			].filter(Boolean),
		}
	})

	return {
		tag: 'div',
		attributes: { class: 'breadcrumbs' },
		children: elements,
	}
}

function getDisplayName(part) {
	switch (part) {
		case 'users':
			return 'Пользователи'
		case 'todos':
			return 'Задачи'
		case 'posts':
			return 'Посты'
		case 'comments':
			return 'Комментарии'
		default:
			return part
	}
}
