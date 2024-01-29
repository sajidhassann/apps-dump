import { Macro } from '@/application/models/macro/macro.model'
import { Box, Button, Modal, MultiSelect, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'

interface MacroModalProps {
    macro?: Macro
    isOpen: boolean
    onClose: () => void
    onSave: (macro: Macro) => void
}

const MacroModal = (props: MacroModalProps) => {
    const { macro, isOpen, onSave, onClose } = props
    const form = useForm<Macro>({})
    const [data, setData] = useState<string[]>([])

    useEffect(() => {
        if (macro) {
            form.setValues({ title: macro.title, response: macro.response, tags: macro.tags, id: macro.id })
            setData(macro.tags)
        } else {
            form.setValues({ title: '', response: '', tags: [] })
            setData([])
        }
    }, [macro])



    return (
        <Modal size="xl" opened={isOpen} onClose={onClose} title={`${macro ? 'Edit' : 'Add'} Macro`} centered={true}>
            <form onSubmit={form.onSubmit(onSave)} style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-around', alignItems: 'center', gap: 10 }}>
                <TextInput w="100%" label="Title" placeholder="Macro Title"  {...form.getInputProps('title')} />
                <Textarea minRows={8} w="100%" label="Content" placeholder="Macro Content"  {...form.getInputProps('response')} />
                <MultiSelect
                    w="100%"
                    label="Tags"
                    data={data}
                    placeholder="Select tags"
                    searchable
                    creatable
                    getCreateLabel={(query) => `Add ${query}`}
                    onCreate={(query) => {
                        setData((data) => [...data, query])
                        return query
                    }}
                    {...form.getInputProps('tags')}
                />
                <Button w="50%" type='submit' mt={10} variant='outline' color='green'>
                    Save
                </Button>
            </form>
        </Modal>
    )
}

export default MacroModal