import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		isDraft: z.boolean(),
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().refine((img) => img.width >= 1080, {
			message: "Cover image must be at least 1080 pixels wide!",
		  }),
		language: z.enum(['en', 'ko']),
		finishedLanguage: z.enum(['en', 'ko']).optional(),
		tags: z.array(z.string()),
		series: z.string().optional(),
		seriesNum: z.number().optional(),
	}),
})

export const collections = { blog }
