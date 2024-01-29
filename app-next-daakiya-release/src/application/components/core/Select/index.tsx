import { Loader, Select, Sx } from '@mantine/core'

// type options = {
//     value: string
//     label: string
// }

type SelectProps = {
   options: any[]
   label?: string
   placeholder?: string
   isRequired: boolean
   isCustomOptions?: boolean
   data: any
   sx?: Sx
   isDisabled?: boolean
   isLoading?: boolean
   searchable?: boolean
}

export default function CustomSelect(props: SelectProps) {
   const {
      options,
      isLoading = false,
      label,
      isCustomOptions = false,
      isDisabled = false,
      placeholder = '',
      isRequired,
      data,
      searchable = false,
      sx,
   } = props

   function createCustomOptions() {
      const customOptions = []

      for (const item of options) {
         customOptions.push({ value: item?.id, label: item?.name })
      }

      return customOptions
   }

   return (
      <Select
         searchable={searchable}
         label={label}
         placeholder={placeholder}
         icon={isLoading && <Loader size={18} color="blue" />}
         data={isCustomOptions ? createCustomOptions() : options}
         required={isRequired}
         disabled={isDisabled || isLoading}
         sx={sx}
         styles={() => ({
            label: {
               fontSize: 13,
               marginBottom: 4,
            },
            item: {
               '&[data-selected]': {
                  '&, &:hover': {
                     backgroundColor: 'lightgray',
                     color: 'black',
                  },
               },
            },
         })}
         {...data}
      />
   )
}
