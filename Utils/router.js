import { usersStruct } from '../Structs/UsersStruct.js'
import { postsStruct } from '../Structs/PostsStruct.js'
import { todosStruct } from '../Structs/ToDosStruct.js'
import { commentsStruct } from '../Structs/CommentsStruct.js'

export function parseHash() {
	return location.hash.split('#').filter(Boolean)
}

export function navigateTo(hash) {
	location.hash = hash
}

export function getMainStructure(path) {
	if (path[0] === 'users' && path[1] === 'posts') return postsStruct()
	else if (path[0] === 'users' && path[1] === 'todos') return todosStruct()
	else if (path[0] === 'users' && path[1] === 'posts' && path[2] === 'comments')
		return commentsStruct()
	else return usersStruct()
}
