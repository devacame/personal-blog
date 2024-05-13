export default (series: string = '') =>
	encodeURI(
		series
			.toLowerCase()
			.replaceAll(/(' *|%| *& *| *@ | *: *| )/g, '-')
			.replaceAll('.', ''),
	)
