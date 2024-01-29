import { Button, Grid, Group, ScrollArea, Text, useMantineTheme } from '@mantine/core'
import React, { useCallback, useState } from 'react'
import useStyles from './styles'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import MacroTab from './MacrosTab'
import DeleteModal from './DeleteModal'
import { Macro } from '@/application/models/macro/macro.model'
import MacroModal from './MacroModal'
import { toggleMacrosManager } from '@/application/redux/states/shared/macros'
import { IMacroState } from '@/application/redux/states/shared/macros/types'
import { createMacro, deleteMacro, updateMacro } from '@/application/redux/networkThunk/macros'
import { on } from 'events'


const MacrosManager = () => {
    const dispatch = useAppDispatch()
    const { macros: MACROS }: IMacroState = useAppSelector((state) => state.macro)
    const theme = useMantineTheme()
    const { classes } = useStyles()
    const [currentMacro, setCurrentMacro] = useState<Macro>()
    const [macroModal, setMacroModal] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    
    const oneMacroModal = useCallback((macro?: Macro) => {
        setCurrentMacro(macro)
        setMacroModal(!!macro)
    }, [])

    const onSave = useCallback((macro:Macro) => {
        if (macro.id) {
            dispatch(updateMacro(macro))
        }
        else {
            dispatch(createMacro(macro))
        }
        oneMacroModal()
    }, [])

    const onDeleteModal = useCallback((macro?:Macro) => {
        setCurrentMacro(macro)
        setDeleteModal(!!macro)
    }, [])

    const onDelete = useCallback(() => {
        if (!currentMacro) return
        dispatch(deleteMacro(currentMacro.id))
        onDeleteModal()
    }, [currentMacro, dispatch, onDeleteModal])
    
    const onNew = useCallback(() => {
        setCurrentMacro(undefined)
        setMacroModal(true)
    }, [])



    return (
        <Grid.Col span={9} p={0} m={0} className={classes.container}>
            <Group position="left" p={16}>
                <IconArrowNarrowLeft
                    size={30} strokeWidth={1}
                    color={theme.colors.background[3]} cursor="pointer"
                    onClick={() => dispatch(toggleMacrosManager(false))} />
                <Text fz="xl" color={theme.black} weight={700}>Messaging Options</Text>
                <Button type='submit' ml='auto' variant='outline' color='blue' onClick={onNew}> Add New Macro </Button>
            </Group>
            <ScrollArea h="75vh" mb="lg">
                {MACROS.map((macro) => (
                    <MacroTab
                        key={macro.id}
                        macro={macro}
                        onDelete={() => {
                            onDeleteModal(macro as Macro)
                        }}
                        onEdit={() => {
                            oneMacroModal(macro as Macro)
                        }} />
                ))}
            </ScrollArea>
            <DeleteModal
                isOpen={!!currentMacro && deleteModal}
                onClose={()=>onDeleteModal()}
                onDelete={()=>onDelete()} />
            <MacroModal onClose={()=>oneMacroModal()} onSave={onSave} macro={currentMacro} isOpen={macroModal} />
        </Grid.Col>
    )
}

export default MacrosManager



