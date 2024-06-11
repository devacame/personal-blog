import { SITE_TITLE } from '@consts'
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

	const tags = Array.from(
		new Set(
			blog.reduce(
				(cur, post) =>
					cur.concat(
						post.data.tags.map((tag) => {
							return {
								tag: tag,
								lang: post.data.language,
							}
						}),
					),
				[] as { tag: string; lang: string }[],
			),
		),
	).map(({ tag, lang }) => {
		return {
			params: { img: `${lang}/tags/${urlencode(tag)}` },
			props: {
				title: `${tag} ${lang == 'en' ? 'Tag' : '태그'}`,
			},
		}
	})

	return [
		...posts,
		...tags,
		...series,
		{
			params: { img: 'en' },
			props: {
				title: `${SITE_TITLE} Blog`,
			},
		},
		{
			params: { img: 'ko' },
			props: {
				title: `${SITE_TITLE} 블로그`,
			},
		},
		{
			params: { img: 'en/about' },
			props: {
				title: `About ${SITE_TITLE}`,
			},
		},
		{
			params: { img: 'ko/about' },
			props: {
				title: `About ${SITE_TITLE}`,
			},
		},
		{
			params: { img: 'en/search' },
			props: {
				title: `Search ${SITE_TITLE}`,
			},
		},
		{
			params: { img: 'ko/search' },
			props: {
				title: `${SITE_TITLE} 검색`,
			},
		},
		{
			params: { img: 'en/tags' },
			props: {
				title: `Tags on ${SITE_TITLE}`,
			},
		},
		{
			params: { img: 'ko/tags' },
			props: {
				title: `${SITE_TITLE}의 태그들`,
			},
		},
		{
			params: { img: 'en/series' },
			props: {
				title: `Series' on ${SITE_TITLE}`,
			},
		},
		{
			params: { img: 'ko/series' },
			props: {
				title: `${SITE_TITLE}의 시리즈들`,
			},
		},
		{
			params: { img: 'rss' },
			props: {
				title: 'RSS Feed | RSS 피드',
			},
		},
		{
			params: { img: '404' },
			props: {
				title: '404 Error',
			},
		},
	]
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
