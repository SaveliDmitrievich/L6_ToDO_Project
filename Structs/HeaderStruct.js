import { searchStruct } from './SearchStruct.js'
import { getBreadcrumbsStructure } from '../Utils/breadCrumbs.js'
const headerStruct = () => ({
	tag: 'header',
	attributes: { class: 'header' },
	children: [
		{
			tag: 'div',
			attributes: { class: 'header__content container' },
			children: [
				{
					tag: 'div',
					attributes: { class: 'header__title' },
					children: [
						{
							tag: 'a',
							attributes: { href: '#users', class: 'nav__link' },
							content: 'Reeddix',
						},
					],
				},
				{
					tag: 'nav',
					attributes: { class: 'header__nav' },
					children: [
						{
							tag: 'a',
							attributes: { href: '#users', class: 'nav__link' },
							content: 'Пользователи',
						},
					],
				},
			],
		},
	],
})

export { headerStruct }
