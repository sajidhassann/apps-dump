import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { toggleSelectList, toggleShowTicketTabs } from '@/application/redux/states/agent/ticket'
import { ITicketState } from '@/application/redux/states/agent/ticket/types'
import { Box, Image,Text } from '@mantine/core'
import { useCallback } from 'react'
import useStyles from '../styles'

const Archive = () => {
    const { classes } = useStyles()

    const dispatch = useAppDispatch()
    
    const onClickSelect = useCallback(() => {
        dispatch(toggleSelectList())
    }, [dispatch])

    const toggleTicketTabs = useCallback(() => {
        dispatch(toggleShowTicketTabs())
    }, [dispatch])

    const { showSelectList, showTicketTabs }: ITicketState = useAppSelector(
        (state) => state.ticket
    )

    return !showSelectList ? (
        <>
            <Box className={classes.archiveContainer} onClick={toggleTicketTabs}>
                <Image
                    alt="archive"
                    src="/assets/icons/archive.svg"
                    width={20}
                    height={20}
                />
                <span className={classes.archive}>Archived</span>
            </Box>
            {showTicketTabs && (<Text onClick={onClickSelect} className={classes.select}>Select</Text>)}
        </>
    ): null
}
export default Archive