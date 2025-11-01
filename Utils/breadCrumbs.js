import { parseHash, navigateTo } from './router.js'

export function getBreadcrumbsStructure() {
	const path = parseHash()
	let currentHash = ''

	const crumbs = path.map((part, index) => {
		currentHash += (currentHash ? '#' : '') + part
		const isLast = index === path.length - 1

		return {
			tag: 'span',
			attributes: { class: 'crumb' },
			content: isLast ? part : part + ' > ',
			listeners: !isLast ? { click: () => navigateTo(currentHash) } : undefined,
		}
	})

	return {
		tag: 'div',
		attributes: { class: 'breadcrumbs' },
		children: crumbs,
	}
}
