
import { Flex, Footer, Text } from '@mantine/core'

export type FooterPropTypes = {
	appName: string
	copyright: string
}

export default function CustomFooter(props: FooterPropTypes) {
	return (
		<Footer height={{ base: 50, xs: 50 }} p='sm' m={0}>
			<Flex
				justify='space-between'
				wrap='wrap'
			>
				<Text fz="xs">
					{props?.appName}
				</Text>
				<Text fz="xs" >
					{props?.copyright}
				</Text>
			</Flex>
		</Footer>
	)
}