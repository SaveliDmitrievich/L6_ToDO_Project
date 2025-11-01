'use strict'

function createTag(tag) {
	return document.createElement(tag)
}

function setAttributes(element, props) {
	if (!props) return
	for (let attr in props) {
		element.setAttribute(attr, props[attr])
	}
}

function setContent(element, content) {
	if (!content) return
	if (typeof content === 'string') {
		element.textContent = content
	} else if (content instanceof Node) {
		element.appendChild(content)
	} else if (Array.isArray(content)) {
		content.forEach(child => {
			setContent(element, child)
		})
	}
}

function setChildren(element, children) {
	if (!children) return
	children.forEach(child => {
		element.appendChild(render(child))
	})
}

function setEventListener(element, listeners) {
	if (!listeners) return
	for (let event in listeners) {
		element.addEventListener(event, listeners[event])
	}
}

export function render(component, parent) {
	const { tag, attributes, content, children, listeners } = component
	if (!tag) return null

	const element = createTag(tag)
	setAttributes(element, attributes)
	setContent(element, content)
	setChildren(element, children)
	setEventListener(element, listeners)

	if (parent) {
		parent.innerHTML = ''
		parent.appendChild(element)
	}

	return element
}

export default render
