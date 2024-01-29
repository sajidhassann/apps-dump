import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { Box, Button, ScrollArea, Text } from '@mantine/core'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import useStyles from './styles'
import { ITicketState } from '@/application/redux/states/agent/ticket/types'
import { getUserAdditionalProperties, getUserProperties } from '@/application/redux/networkThunk/agent/ticket'

interface IUserPropertiesProps {
    setShowUserProperties: Dispatch<SetStateAction<boolean>>
}

export default function UserProperties(props: IUserPropertiesProps) {

    const { setShowUserProperties } = props
    const { classes } = useStyles()
    const dispatch = useAppDispatch()

    // const [search, setSearch] = useState<string>('')
    const [isLoadMore, setIsLoadMore] = useState<boolean>(false)
    const { details, currentTicket }: ITicketState = useAppSelector((state) => state.ticket)

    // const onSearchChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    //     setSearch(event.target.value)
    // }, [])


    useEffect(()=> {
        if (currentTicket?.number)
            dispatch(getUserProperties(currentTicket?.number))
        
        setIsLoadMore(false)

    },[currentTicket?.number])

    const getAdditionalProperties = useCallback(() => {
        if (currentTicket?.number)
            {dispatch(getUserAdditionalProperties(currentTicket?.number)).then(()=>{
                setIsLoadMore(true)
            })}
    },[currentTicket?.number, dispatch])

    return <>
            <Box className={classes.headerContainer}>
                <Box onClick={() => setShowUserProperties(false)} sx={{ cursor: 'pointer', marginLeft: '10px' }}>
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.59962 1L1 8.08411L7.4429 15" stroke="#646466" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Box>
                <Text className={classes.headerText}>User Properties</Text>
            </Box>
            {/*<Box>*/}
            {/*    <TextInput*/}
            {/*        value={search}*/}
            {/*        onChange={onSearchChange}*/}
            {/*        placeholder="Search or select User Properties"*/}
            {/*        rightSection={<IconSearch size="1rem" color='#646466'/>}*/}
            {/*        mt={30}*/}
            {/*        px={5}*/}
            {/*    />*/}
            {/*</Box>*/}
            {details ?
                <ScrollArea h= '76vh'>
                    <Box p='md'>
                        <Text>User Id</Text>
                        <Text color='#646466'>{details?.userID}</Text>
                    </Box>
                    <Box p='sm'>
                        <Text>Last Purchase</Text>
                    </Box>
                    <Box p='lg'>
                        <Text>Product Name</Text>
                        <Text color='#646466'>{details?.lastPurchased?.productName}</Text>
                    </Box>
                    <Box p='lg'>
                        <Text>Payment Method</Text>
                        <Text color='#646466'>{details?.lastPurchased?.paymentMethod}</Text>
                    </Box>
                    <Box p='lg'>
                        <Text>Purchase Date</Text>
                        <Text color='#646466'>{details?.lastPurchased?.purchaseDate}</Text>
                    </Box>
                    <Box p='md'>
                        <Text>Remaining Number Of Doubts</Text>
                        <Text color='#646466'>{details?.remainingDoubts}</Text>
                    </Box>
                    <Box p='md'>
                        <Text>First App Session</Text>
                        <Text color='#646466'>{details?.firstAppSession}</Text>
                    </Box>
                    <Box p='md'>
                        <Text>Sikkay Status</Text>
                        <Text color='#646466'>{details?.sikkayStatus}</Text>
                    </Box>
                    <Box p='md'>
                        <Text>Class</Text>
                        <Text color='#646466'>{details?.class}</Text>
                    </Box>
                    <Box p='md'>
                        <Text>Board</Text>
                        <Text color='#646466'>{details?.board}</Text>
                    </Box>
                    {isLoadMore ? <>
                        <Box p='md'>
                            <Text>Full name</Text>
                            <Text color='#646466'>{details?.fullName}</Text>
                        </Box>
                        <Box p='md'>
                            <Text>App Version</Text>
                            <Text color='#646466'>{details?.appVersion}</Text>
                        </Box>
                        <Box p='md'>
                            <Text>OS</Text>
                            <Text color='#646466'>{`${details?.os} ${details?.osVersion}`}</Text>
                        </Box>
                        <Box p='md'>
                            <Text>Location</Text>
                            <Text color='#646466'>{`${details?.city} ${details?.region}`}</Text>
                        </Box>
                    </> : <Button w='90%' mt='md' ml='sm' size='sm' radius='md' className={classes.loadMore} onClick={getAdditionalProperties}>
                        Load More
                    </Button>}
                </ScrollArea> : <Text p='sm' color = 'red'>User Details Does Not Exist</Text>
            }
        </>
}