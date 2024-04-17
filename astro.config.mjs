import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import remarkToc from 'remark-toc'
import remarkMath from 'remark-math'
import remarkNormalizeHeadings from 'remark-normalize-headings'
import remarkCollapse from 'remark-collapse'
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
		remarkPlugins: [remarkToc, remarkMath, [remarkCollapse, { test: 'Table of Contents', summary: (str) => str }], remarkNormalizeHeadings],
		rehypePlugins: [rehypeKatex],
		shikiConfig: {
			theme: 'nord',
			wrap: true,
		}
	},
	integrations: [mdx(), sitemap(), tailwind()],
})
