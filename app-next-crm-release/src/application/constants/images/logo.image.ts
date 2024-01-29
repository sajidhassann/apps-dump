import { LogoVariations } from './types/image.type'

const MaqsadLogos = {
	whiteBackground: '/logo-512-bg-white.png',
	transparentBackground: '/logo-512-transparent.png',
	monochrome: '/logo-monochrome.png',
	noMargin: '/logo-no-margins.png',
	white: '/logo-white.png',
}

const InvestorLogos = {
	indusValleyCapital: '/assets/images/logos/investors/logo-indus-valley-capital.png',
	alterGlobal: '/assets/images/logos/investors/logo-alter-global.png',
	fatimaGobiVentures: '/assets/images/logos/investors/logo-fatima-gobi-ventures.png',
}

const PublisherLogos = {
	bloomberg: '/assets/images/logos/publishers/logo-bloomberg.png',
	techCrunch: '/assets/images/logos/publishers/logo-techcrunch.png',
	menaBytes: '/assets/images/logos/publishers/logo-menabytes.png',
}

const RoveLogos: LogoVariations = {
	light: '/assets/images/logos/rove/logo-light-transparent-bg-noTag-noMargins.png',
	dark: '/assets/images/logos/rove/logo-dark-transparent-bg-noTag-noMargins.png',
	monochrome: '/assets/images/logos/rove/logo-dark-transparent-bg-noTag-noMargins.png'
}

const AffiliateLogos = {
	rove: RoveLogos
}

export const Logos = {
	maqsad: MaqsadLogos,
	investors: InvestorLogos,
	publisher: PublisherLogos,
	affiliate: AffiliateLogos
}