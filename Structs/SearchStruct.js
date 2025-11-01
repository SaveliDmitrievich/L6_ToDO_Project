import { parseHash } from '../Utils/router.js'
import { usersData } from '../Data/usersData.js'
import { todosData } from '../Data/todosData.js'
import { postsData } from '../Data/postsData.js'
import { commentsData } from '../Data/commentsData.js'

import { usersStruct } from './UsersStruct.js'
import { todosStruct } from './ToDosStruct.js'
import { postsStruct } from './PostsStruct.js'
import { commentsStruct } from './CommentsStruct.js'

import render from '../Generator/generator.js'
import { debounce } from '../Utils/debounce.js'

export function searchStruct() {
	return {
		tag: 'input',
		attributes: {
			type: 'text',
			id: 'search-input',
			class: 'search-input',
			placeholder: 'Поиск...',
			autocomplete: 'off',
		},
		listeners: {
			input: debounce(handleSearch, 300),
		},
	}
}

function handleSearch(event) {
	const query = event.target.value.trim().toLowerCase()
	const path = parseHash()
	const [root, userId, subpage, postId, subsubpage] = path

	console.clear()
	console.log('Путь:', path, 'Запрос:', query)

	let filtered = []

	if (root === 'users' && !subpage) {
		filtered = query
			? usersData.filter(
					u =>
						u.name.toLowerCase().includes(query) ||
						u.email.toLowerCase().includes(query)
			  )
			: usersData
		console.log('Пользователи:', filtered)
		render(usersStruct(filtered), document.querySelector('main'))
	}

	if (root === 'users' && subpage === 'todos') {
		filtered = query
			? todosData.filter(
					t => t.userId == userId && t.title.toLowerCase().includes(query)
			  )
			: todosData.filter(t => t.userId == userId)
		console.log('Задачи:', filtered)
		render(todosStruct(userId, filtered), document.querySelector('main'))
	}

	if (root === 'users' && subpage === 'posts' && !subsubpage) {
		filtered = query
			? postsData.filter(
					p =>
						p.userId == userId &&
						(p.title.toLowerCase().includes(query) ||
							p.body.toLowerCase().includes(query))
			  )
			: postsData.filter(p => p.userId == userId)
		console.log('Посты:', filtered)
		render(postsStruct(userId, filtered), document.querySelector('main'))
	}

	if (root === 'users' && subpage === 'posts' && subsubpage === 'comments') {
		filtered = query
			? commentsData.filter(
					c =>
						c.postId == postId &&
						(c.name.toLowerCase().includes(query) ||
							c.body.toLowerCase().includes(query))
			  )
			: commentsData.filter(c => c.postId == postId)
		console.log('Комментарии:', filtered)
		render(
			commentsStruct(userId, postId, filtered),
			document.querySelector('main')
		)
	}
}
