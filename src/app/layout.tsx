import './globals.css'
import localFont from 'next/font/local'
import Nav from '@/components/nav/nav'
import Footer from '@/components/footer/footer'

const fontDisplay = localFont({
	src: './jegelskerdig.woff2',
	variable: '--font-display',
})
const fontBody = localFont({
	src: './montserrat.woff2',
	variable: '--font-body',
})

export const metadata = {
	title: 'Downonly',
	description:
		'Downonly is a time-limited performative work that combines an installation, an interactive game and a series of digital artworks. It gives participants a chance to engage in an experience centered around the concept of falling.',
}

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<html
			className={`${fontDisplay.variable} ${fontBody.variable}`}
			lang="en"
			suppressHydrationWarning={true}
		>
			<body className="grid grid-rows-[auto_1fr_auto] bg-snow font-body text-carbon transition-colors dark:bg-cole dark:text-snow">
				<Nav className="container relative z-10 my-10 w-full" />
				<main>
					<div className="container flex flex-col items-stretch">
						{props.children}
					</div>
				</main>
				<Footer />
			</body>
		</html>
	)
}
