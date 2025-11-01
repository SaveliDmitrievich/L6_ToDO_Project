import { commentsData } from '../Data/commentsData.js'
import { postsData } from '../Data/postsData.js'

const commentsStruct = (userId, postId, filteredData) => {
	const post = postsData.find(p => p.id == postId)
	const postComments =
		filteredData || commentsData.filter(c => c.postId == postId)

	const commentCards = postComments.map(comment => ({
		tag: 'div',
		attributes: { class: 'comment-card' },
		children: [
			{
				tag: 'p',
				attributes: { class: 'comment-card__author' },
				content: comment.name,
			},
			{
				tag: 'p',
				attributes: { class: 'comment-card__body' },
				content: comment.body,
			},
		],
	}))

	return {
		tag: 'main',
		children: [
			{
				tag: 'div',
				attributes: { class: 'post-detail' },
				children: [
					{
						tag: 'h2',
						attributes: { class: 'post-detail__title' },
						content: post.title,
					},
					{
						tag: 'p',
						attributes: { class: 'post-detail__body' },
						content: post.body,
					},
				],
			},
			{
				tag: 'div',
				attributes: { class: 'comments-section' },
				children: commentCards,
			},
		],
	}
}

export { commentsStruct }
