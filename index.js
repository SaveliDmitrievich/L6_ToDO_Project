import render from './Generator/generator.js'
import { headerStruct } from './Structs/HeaderStruct.js'
import { getBreadcrumbsStructure } from './Utils/breadCrumbs.js'
import { parseHash, getMainStructure } from './Utils/router.js'
import { footerStruct } from './Structs/FooterStruct.js'
import { searchStruct } from './Structs/SearchStruct.js'

const root = document.getElementById('container')

function renderPage() {
	const path = parseHash()
	const mainStructure = getMainStructure(path)

	const pageStructure = {
		tag: 'div',
		attributes: { class: 'wrapper' },
		children: [
			headerStruct(),
			searchStruct(),
			getBreadcrumbsStructure(),
			mainStructure,
			footerStruct(),
		],
	}

	root.innerHTML = ''
	render(pageStructure, root)
}

window.addEventListener('hashchange', renderPage)
window.addEventListener('load', renderPage)
