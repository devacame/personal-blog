import { normalize } from 'hangul-util'
export default (series: string = '') =>
	encodeURI(
		normalize(series, false)
			.toLowerCase()
			.replaceAll(/(' *|%| *& *| *@ | *: *| )/g, '-')
			.replaceAll('.', ''),
	)
