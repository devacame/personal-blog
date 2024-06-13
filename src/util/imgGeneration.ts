import sharp from 'sharp'
import { readFile } from 'node:fs/promises'
import satori, { type SatoriOptions } from 'satori'
import { Template } from '@utils/imgTemplate'
import { SITE_TITLE } from '@consts'

// derived from https://jafaraziz.com/blog/generate-open-graph-images-with-astro-and-satori/
const generateImage = async (
	text: string = SITE_TITLE,
	date: Date = new Date(),
	series: string = '',
	type: string,
): Promise<Buffer> => {
	const options: SatoriOptions = {
		width: 1200,
		height: 630,
		embedFont: true,
		fonts: [
			{
				name: 'SpoqaHanSansNeo',
				data: await readFile(
					'./src/util/imgFonts/SpoqaHanSansNeo-Regular.ttf',
				),
				weight: 400,
				style: 'normal',
			},
			{
				name: 'SpoqaHanSansNeo',
				data: await readFile(
					'./src/util/imgFonts/SpoqaHanSansNeo-Bold.ttf',
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

	let buffer = sharp(Buffer.from(svg))
	if (type == 'head') {
		return await buffer.webp({ quality: 80 }).toBuffer()
	} else {
		return await buffer.resize(800).jpeg({ quality: 80 }).toBuffer()
	}
}

export default generateImage
