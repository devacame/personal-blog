import sharp from 'sharp'
import { readFile } from 'node:fs/promises'
import satori, { type SatoriOptions } from 'satori'
import { Template } from '@utils/ogTemplate'
import { SITE_TITLE } from '@consts'

// derived from https://jafaraziz.com/blog/generate-open-graph-images-with-astro-and-satori/
const generateOgImage = async (
	text: string = SITE_TITLE,
	date: Date = new Date(),
	series: string = '',
): Promise<Buffer> => {
	const options: SatoriOptions = {
		width: 1200,
		height: 630,
		embedFont: true,
		fonts: [
			{
				name: 'SpoqaHanSansNeo',
				data: await readFile(
					'./src/util/ogFonts/SpoqaHanSansNeo-Regular.ttf',
				),
				weight: 400,
				style: 'normal',
			},
			{
				name: 'SpoqaHanSansNeo',
				data: await readFile(
					'./src/util/ogFonts/SpoqaHanSansNeo-Bold.ttf',
				),
				weight: 700,
				style: 'normal',
			},
		],
	}

	const svg = await satori(
		Template({
			title: text,
			date: date,
			series: series,
		}),
		options,
	)

	const buffer = await sharp(Buffer.from(svg)).toBuffer()

	return buffer
}

export default generateOgImage
