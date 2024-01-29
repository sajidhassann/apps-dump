import useDebounce from '@/application/components/core/hooks/UseDebounce'
import { TicketTag } from '@/application/constants/enums/ticket.tag.enum'
import { Ticket } from '@/application/models/ticket/tickets.model'
import { NetworkingManger } from '@/application/services/networking'
import { Box, Button, Checkbox, ScrollArea, Text, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { ChangeEventHandler, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import useStyles from './styles'

interface ITagListProps {
    setShowTagList: Dispatch<SetStateAction<boolean>>
    ticket?: Ticket
}

type TagMap = {[key: string]: boolean | undefined }

const tagList = Object.values(TicketTag)

export default function TagList(props: ITagListProps) {

    const { setShowTagList , ticket } = props
    const { classes } = useStyles()

    const [search, setSearch] = useState<string>('')
    const [ticketTagList, setTicketTagList] = useState<TicketTag[]>(tagList)

    const onSearchChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
        setSearch(event.target.value)
    },[])

    const [tags, setTags] = useState<TagMap>({})

    useDebounce(()=> {
        if (search){
            const regex = new RegExp(search,'gi')
            setTicketTagList(tagList.filter((tag) => !!tag.match(regex)))
            return
        }
        setTicketTagList(tagList)
    }, 300, [search])

    const onCheckboxChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event)=>{
        setTags((tags)=>{
            if (event.target.checked)
                tags[event.target.name] = event.target.checked
            else
                delete tags[event.target.name]
            
            return { ...tags }
        })
    },[])

    const onClickHandler = useCallback(async ()=>{
        const ticketTags = Object.keys(tags)
        const updatedTicket = { id: ticket?.id, tags: ticketTags } as Ticket
        await NetworkingManger.agent.update.updateTicket(updatedTicket)
        setShowTagList(false)
    },[setShowTagList, tags, ticket?.id])


    useEffect(()=> {
        setTags((tags) => ({ ...tags, ...ticket?.tags?.reduce((map: TagMap, tag) => {
            map[tag] = true
            return map
        }, {})
    }) ?? {})
    },[ticket?.tags])

    return (
        <>
            <Box className={classes.headerContainer}>
                <Box onClick={() => setShowTagList(false)} sx={{ cursor: 'pointer', marginLeft: '10px' }}>
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.59962 1L1 8.08411L7.4429 15" stroke="#646466" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Box>
                <Text className={classes.headerText}>Contact Info</Text>
             </Box>
             <Box>
                <TextInput
                    value={search}
                    onChange={onSearchChange}
                    placeholder="Search or select tags"
                    rightSection={<IconSearch size="1rem" color='#646466' />}
                    mt={30}
                    px={5}
                />
             </Box>
             <Box mx='auto' mt='lg' px='sm'>
                <ScrollArea h="calc(100vh - 240px)">
                    {ticketTagList.map(tag =>
                        <Checkbox
                            transitionDuration={800}
                            key={tag}
                            my='sm'
                            label={tag.replace(/_/g,' ')}
                            name={tag}
                            color="blue"
                            radius="lg"
                            size="sm"
                            disabled={ticket?.isDisabled}
                            checked={!!tags[tag]}
                            onChange={onCheckboxChange}
                        />
                    )}
                </ScrollArea>
             </Box> 
             <Button disabled={ticket?.isDisabled} onClick={onClickHandler} bg='#F2F2F2' w='100%' variant='outline' radius='md' sx={{ border: '1px solid #F2AE1C', color: '#646466', fontWeight: 400 }}>Done</Button>
        </>
    )
}