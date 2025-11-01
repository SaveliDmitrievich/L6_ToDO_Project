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
	const [root, userId, subpage, postId, subsubpage] = path

	if (root === 'users' && subpage === 'todos') {
		return todosStruct(userId)
	}

	if (root === 'users' && subpage === 'posts' && !subsubpage) {
		return postsStruct(userId)
	}

	if (root === 'users' && subpage === 'posts' && subsubpage === 'comments') {
		return commentsStruct(userId, postId)
	}

	return usersStruct()
}
