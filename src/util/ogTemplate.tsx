import { SITE_TITLE } from '@consts'
import React from 'react'

export interface OgData {
	title: string
	date: Date
	series: string
}

// derived from github.com/satnaing/astro-paper
export function Template(props: OgData) {
	return (
		<div
			style={{
				background: '#fefbfb',
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: 'SpoqaHanSansNeo',
			}}
		>
			<div
				style={{
					position: 'absolute',
					bottom: '-1px',
					right: '-1px',
					border: '4px solid #000',
					background: '#ecebeb',
					opacity: '0.9',
					borderRadius: '4px',
					display: 'flex',
					justifyContent: 'center',
					margin: '2.5rem',
					width: '88%',
					height: '80%',
				}}
			/>

			<div
				style={{
					border: '4px solid #000',
					background: '#fefbfb',
					borderRadius: '4px',
					display: 'flex',
					justifyContent: 'center',
					margin: '2rem',
					width: '88%',
					height: '80%',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						margin: '20px',
						width: '90%',
						height: '90%',
					}}
				>
					{props.series !== '' && (
						<h2
							style={{
								fontSize: 50,
								fontWeight: 'regular',
								overflow: 'hidden',
								marginBottom: '0px',
								textDecoration: 'underline',
								textDecorationColor: '#0997de',
							}}
						>
							{props.series}
						</h2>
					)}
					<h1
						style={{
							fontSize: 90,
							fontWeight: 'bold',
							maxHeight: '84%',
							overflow: 'hidden',
						}}
					>
						{props.title}
					</h1>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							width: '100%',
							marginBottom: '8px',
							fontSize: 40,
						}}
					>
						<span
							style={{ overflow: 'hidden', fontWeight: 'bold' }}
						>
							{props.date.toLocaleDateString()}
						</span>

						<span
							style={{
								overflow: 'hidden',
								fontWeight: 'bold',
								fontSize: 60,
							}}
						>
							{SITE_TITLE}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
