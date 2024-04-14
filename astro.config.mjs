import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import remarkToc from 'remark-toc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import mdx from '@astrojs/mdx'

import sitemap from '@astrojs/sitemap'

export default defineConfig({
	site: 'http://localhost:4321',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'ko'],
		routing: {
			prefixDefaultLocale: true
		}
	},
	markdown: {
		remarkPlugins: [remarkToc, remarkMath],
		rehypePlugins: [rehypeKatex],
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
			wrap: true,
		}
	},
	integrations: [mdx(), sitemap(), tailwind()],
})
