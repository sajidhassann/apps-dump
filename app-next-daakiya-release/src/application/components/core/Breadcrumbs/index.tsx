import { Box, Breadcrumbs, Group, Text, Tooltip } from '@mantine/core'
import { SectionViewType } from '@src/application/constants/enums/notes.view.type'
import { AppDispatch } from '@src/application/redux'
import { useAppSelector } from '@src/application/redux/hooks'
import {
   setAcademicModalOpen,
   setActiveForm,
   updateBreadcrumbs,
} from '@src/application/redux/states/shared/sharedSlice/slice'
import { IBreadcrumbs } from '@src/application/redux/states/shared/sharedSlice/types'
import Image from 'next/image'
import { Key, useMemo } from 'react'
import { useDispatch } from 'react-redux'

type BreadcrumbPropsType = {
   setActiveTable: React.Dispatch<React.SetStateAction<SectionViewType>>
}

export default function Breadcrumb(props: BreadcrumbPropsType) {
   const { setActiveTable } = props

   const { breadcrumbs } = useAppSelector((state) => state.shared)
   const dispatch = useDispatch<AppDispatch>()

   const items = useMemo(() => {
      return breadcrumbs.map((item: IBreadcrumbs, index: Key) => (
         <Group key={index} spacing="1px" className="cursor-pointer">
            <Text
               fz="lg"
               key={`${item?.sectionType} + ${index}`}
               onClick={() => {
                  dispatch(
                     updateBreadcrumbs({
                        title: item?.title,
                        sectionType: item.sectionType,
                        position: item?.position,
                     })
                  )
                  setActiveTable(item.sectionType)
               }}
            >
               {item.title}
            </Text>
            <Tooltip label={`Click to add new ${item.sectionType}`}>
               <Image
                  src="/assets/icons/icon-add.svg"
                  width={20}
                  height={20}
                  alt={item.sectionType}
                  onClick={() => {
                     dispatch(setAcademicModalOpen(true))
                     dispatch(setActiveForm(item.sectionType))
                  }}
               />
            </Tooltip>
         </Group>
      ))
   }, [breadcrumbs])

   return (
      <Box
         sx={(theme) => ({
            backgroundColor:
               theme.colorScheme === 'dark' ? theme.colors.gray[9] : 'white',
            textAlign: 'center',
            padding: theme.spacing.md,
            borderRadius: theme.radius.md,
            marginTop: theme.spacing.md,
            marginBottom: theme.spacing.md,
         })}
      >
         <Breadcrumbs separator="→" mt="xs">
            {items}
         </Breadcrumbs>
      </Box>
   )
}
