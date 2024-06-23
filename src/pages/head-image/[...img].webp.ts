import generateImage from '@utils/imgGeneration'
import type { imgData } from '@utils/imgTemplate.tsx'
import { getPostUrl } from '@utils/postslug'
import urlencode from '@utils/urlencode'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export async function getStaticPaths() {
	const blog = (await getCollection('blog')).filter(
		(post) => !post.data.isDraft,
	)

	const posts = blog.map((post) => {
		return {
			params: { img: getPostUrl(post.slug).slice(1, -1) },
			props: {
				title: post.data.title,
				date: post.data.updatedDate || post.data.pubDate,
				series: post.data.series,
			},
		}
	})

	const series = blog
		.filter(
			(post) => post.data.series != undefined && post.data.seriesNum == 1,
		)
		.map((post) => {
			return {
				params: {
					img: `${post.data.language}/series/${urlencode(post.data.series)}`,
				},
				props: {
					title: `${post.data.series} ${post.data.language == 'en' ? 'Series' : '시리즈'}`,
				},
			}
		})

	return [...posts, ...series]
}

export const GET: APIRoute<imgData> = async ({ props }) => {
	const response = await generateImage(
		props.title,
		props.date,
		props.series,
		'head',
	)
	return new Response(response, {
		status: 200,
		headers: {
			'Content-Type': 'image/webp',
		},
	})
}
