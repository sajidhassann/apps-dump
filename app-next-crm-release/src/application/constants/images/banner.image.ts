import { ImageTypes } from './types/image.type'

const questionBankPromotionBanners: ImageTypes = {
	desktop: '/assets/images/banners/question-bank-promo/banner-mdcat-ecat.png',
	tablet: '/assets/images/banners/question-bank-promo/banner-mdcat-ecat-tablet.png',
	mobile: '/assets/images/banners/question-bank-promo/banner-mdcat-ecat-mobile.png',
}

const RoveXMaqsadMcqBank: ImageTypes = {
	desktop: '/assets/images/banners/affiliations/rove/question-bank-mcq-promo/qb-mcq.png',
	tablet: '/assets/images/banners/affiliations/rove/question-bank-mcq-promo/qb-mcq.png',
	mobile: '/assets/images/banners/affiliations/rove/question-bank-mcq-promo/qb-mcq.png',
}

const RoveXMaqsadVideoSolutionBank: ImageTypes = {
	desktop: '/assets/images/banners/affiliations/rove/question-bank-video-solutions-promo/video-solutions-bank.png',
	tablet: '/assets/images/banners/affiliations/rove/question-bank-video-solutions-promo/video-solutions-bank.png',
	mobile: '/assets/images/banners/affiliations/rove/question-bank-video-solutions-promo/video-solutions-bank.png',
}

const RoveAffiliateBanners = {
	mcqBanner: RoveXMaqsadMcqBank,
	videoSolutionsBanner: RoveXMaqsadVideoSolutionBank
}

const AffiliateBanners = {
	rove: RoveAffiliateBanners
}

export const Banners = {
	questionBank: questionBankPromotionBanners,
	affiliate: AffiliateBanners
}