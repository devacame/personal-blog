import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '@consts'
import { getPostUrl } from '@utils/postslug'

export async function GET(context: { site: any }) {
	const posts = (await getCollection('blog')).filter((post) => !post.data.isDraft && post.data.language == 'en').sort((a, b) => b.data.pubDate - a.data.pubDate)
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: getPostUrl(post.slug),
		})),
		customData: `<language>en-us</language>`,
	})
}
