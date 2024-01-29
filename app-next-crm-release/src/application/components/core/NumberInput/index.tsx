import { TextInput } from '@mantine/core'
import React, { ChangeEvent } from 'react'

type NumberInputPropTypes = {
    placeholder?: string,
    value: string ,
    setValue: (val: ChangeEvent<HTMLInputElement>) => void
	error?: boolean
	classNames?: string
}


export default function ContactInput(props: NumberInputPropTypes) {
	const {
		placeholder= '', 
		value, 
		setValue,
		error=false,
		classNames = ''
	} = props
	return (
		<TextInput
			className={classNames}
			placeholder="+923123456789"
			value={value}
			size='md'
			error = {!error}
			onChange={(val) => setValue(val)}
		/>
	)
}