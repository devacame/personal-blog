import { SITE_TITLE } from '@consts'
import generateOgImage from '@utils/openGraph'
import type { OgData } from '@utils/ogTemplate'
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
			params: { og: getPostUrl(post.slug).slice(1, -1) },
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
					og: `${post.data.language}/series/${urlencode(post.data.series)}`,
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
			params: { og: `${lang}/tags/${tag}` },
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
			params: { og: 'en' },
			props: {
				title: `${SITE_TITLE} Blog`,
			},
		},
		{
			params: { og: 'ko' },
			props: {
				title: `${SITE_TITLE} 블로그`,
			},
		},
		{
			params: { og: 'en/about' },
			props: {
				title: `About ${SITE_TITLE}`,
			},
		},
		{
			params: { og: 'ko/about' },
			props: {
				title: `About ${SITE_TITLE}`,
			},
		},
		{
			params: { og: 'en/search' },
			props: {
				title: `Search ${SITE_TITLE}`,
			},
		},
		{
			params: { og: 'ko/search' },
			props: {
				title: `${SITE_TITLE} 검색`,
			},
		},
		{
			params: { og: 'en/tags' },
			props: {
				title: `Tags on ${SITE_TITLE}`,
			},
		},
		{
			params: { og: 'ko/tags' },
			props: {
				title: `${SITE_TITLE}의 태그들`,
			},
		},
		{
			params: { og: 'en/series' },
			props: {
				title: `Series' on ${SITE_TITLE}`,
			},
		},
		{
			params: { og: 'ko/series' },
			props: {
				title: `${SITE_TITLE}의 시리즈들`,
			},
		},
		{
			params: { og: 'rss' },
			props: {
				title: 'RSS Feed | RSS 피드',
			},
		},
		{
			params: { og: '404' },
			props: {
				title: '404 Error',
			},
		},
	]
}

export const GET: APIRoute<OgData> = async ({ props }) => {
	const response = await generateOgImage(
		props.title,
		props.date,
		props.series,
	)
	return new Response(response, {
		status: 200,
		headers: {
			'Content-Type': 'image/png',
		},
	})
}
