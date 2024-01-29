import React, { useState } from 'react'
import { Burger, MediaQuery } from '@mantine/core'

export type NavbarControlPropTypes = {
    isNavbarExpand: boolean,
    setIsNavbarExpand: React.Dispatch<React.SetStateAction<boolean>>
}


export default function NavbarControl(props: NavbarControlPropTypes) {
	const { isNavbarExpand, setIsNavbarExpand} = props

	return (
		<MediaQuery largerThan="xs" styles={{ display: 'none' }}>

			<Burger
				opened={!isNavbarExpand}
				size='sm'
				mr='md'
				onClick={() => setIsNavbarExpand(!isNavbarExpand)}
			/>
		</MediaQuery>
	)
}