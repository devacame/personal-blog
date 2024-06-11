import { SITE_TITLE } from '@consts'
import generateImage from '@utils/imgGeneration'
import type { imgData } from '@utils/imgTemplate.tsx'
import { getPostUrl } from '@utils/postslug'
import urlencode from '@utils/urlencode'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export async function getStaticPaths() {
	return (await getCollection('blog'))
		.filter((post) => !post.data.isDraft)
		.map((post) => {
			return {
				params: { img: getPostUrl(post.slug).slice(1, -1) },
				props: {
					title: post.data.title,
					date: post.data.updatedDate || post.data.pubDate,
					series: post.data.series,
				},
			}
		})
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
