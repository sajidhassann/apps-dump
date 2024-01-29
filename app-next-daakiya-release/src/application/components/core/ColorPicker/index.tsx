import { CheckIcon, ColorSwatch, Stack, Sx, Text } from '@mantine/core'
import React from 'react'

type ColorPickerProps = {
   colors?: string[]
   setSelectedColor: React.Dispatch<React.SetStateAction<string>>
   selectedColor: string
   style?: React.CSSProperties
   label?: string
   sx?: Sx
}

export default function ColorPicker(props: ColorPickerProps): JSX.Element {
   const {
      colors = ['#6783B7', '#E8B044', '#F27781', '#23235F'],
      selectedColor,
      setSelectedColor,
      label,
      sx,
   } = props

   return (
      <Stack sx={sx}>
         {label && (
            <Text fz="sm" fw={500}>
               {label}
            </Text>
         )}

         <div>
            {colors.map((color, index) => (
               <ColorSwatch
                  key={index}
                  component="button"
                  color={color}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                     e.preventDefault()
                     setSelectedColor((c) => (c === color ? '' : color))
                  }}
                  sx={{ color: '#fff', cursor: 'pointer' }}
                  className="me-2"
               >
                  {selectedColor === color && <CheckIcon width={'10px'} />}
               </ColorSwatch>
            ))}
         </div>
      </Stack>
   )
}
