import { navigateTo } from '../Utils/router.js'
import { postsData } from '../Data/postsData.js'

const postsStruct = (userId, filteredData) => {
	const filteredPosts =
		filteredData || postsData.filter(post => post.userId == userId)

	const postCards = filteredPosts.map(post => ({
		tag: 'div',
		attributes: { class: 'post-card' },
		listeners: {
			click: () => navigateTo(`users#${userId}#posts#${post.id}#comments`),
		},
		children: [
			{
				tag: 'div',
				attributes: { class: 'post-card__header' },
				children: [
					{
						tag: 'span',
						attributes: { class: 'post-card__label' },
						content: 'POST',
					},
					{
						tag: 'h3',
						attributes: { class: 'post-card__title' },
						content: post.title,
					},
				],
			},
			{ tag: 'hr', attributes: { class: 'post-card__divider' } },
			{
				tag: 'p',
				attributes: { class: 'post-card__body' },
				content: post.body,
			},
			{
				tag: 'p',
				attributes: { class: 'post-card__footer' },
				content: 'Нажмите, чтобы увидеть комментарии',
			},
		],
	}))

	return {
		tag: 'main',
		children: [
			{ tag: 'div', attributes: { class: 'posts-grid' }, children: postCards },
		],
	}
}

export { postsStruct }
