import { Box, Button, createStyles, FileButton, FileInput, Modal, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { IAuthState } from '@/application/redux/states/shared/auth/types'
import { NotificationType, Notify } from '@/application/components/core/Notification'
import { createCohort, uploadCohort } from '@/application/redux/networkThunk/admin/cohort'

interface IAddCohortModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const useStyles = createStyles((theme) => ({
    heading: {
        color: '#05046A',
        textAlign: 'center',
    },
    marginVertical: {
        margin: '20px 0',
    },
    button: {
        marginTop: '25px',
        background: '#F2AE1C',
        borderRadius: '8px',
        width: '200px',
    },
    uploadButton: {
        background: theme.colors.lightBlue[0],
        borderRadius: '8px',
    },
    excerpt: {
        color: '#B6B6B6',
        fontSize: '14px',
    },
    container: {
        textAlign: 'center',
        marginInline: '15px',
        cursor: 'pointer',
    },
}))

function AddCohortModal({ isOpen, setIsOpen }: IAddCohortModalProps) {
    const { classes } = useStyles()

    const { user }: IAuthState = useAppSelector((state) => state.auth)

    const form = useForm<{ id?: string; name: string; type: string; file?: File }>({
        initialValues: {
            name: '',
            type: ''
        },
    })

    const dispatch = useAppDispatch()
    const addCohort = useCallback(async (values: typeof form.values) => {
        const response = await dispatch(createCohort({
            id: values.id,
            type: values.type,
            name: values.name,
            adminID: user?.id ?? '',
        })).unwrap()
        console.log('response :>> ', response?.id)
        Notify({
            type: NotificationType.SUCCESS,
            message: 'Cohort added successfully',
            title: 'Cohort',
        })
        if (!values.file) {
            setIsOpen(false)
            return
        }
        dispatch(uploadCohort({ cohortID: response?.id, file: values.file }))
        Notify({
            type: NotificationType.SUCCESS,
            message: 'List uploaded successfully',
            title: 'Cohort users',
        })
        setIsOpen(false)
    }, [form, setIsOpen, user?.id])

    return (
        <Modal
            opened={isOpen}
            onClose={() => {
                setIsOpen(false)
            }}
            size="sm"
            centered
            title={
                <Title order={3} className={classes.heading}>
                    Add New Cohort
                </Title>
            }
        >
            <form onSubmit={form.onSubmit(addCohort)}>
                <TextInput
                    placeholder="Cohort ID"
                    label="Cohort ID"
                    className={classes.marginVertical}
                    {...form.getInputProps('id')}
                />
                <TextInput
                    placeholder="Cohort Name"
                    label="Cohort Name"
                    withAsterisk
                    className={classes.marginVertical}
                    {...form.getInputProps('name')}
                />
                <TextInput
                    placeholder="Cohort Type"
                    label="Cohort Type"
                    withAsterisk
                    className={classes.marginVertical}
                    {...form.getInputProps('type')}
                />
                <FileInput
                    clearable
                    label="Upload CSV"
                    placeholder="No CSV"
                    accept={'.csv'}
                    disabled
                    {...form.getInputProps('file')}
                />
                <FileButton accept=".csv" {...form.getInputProps('file')}>
                    {(props) => <Button {...props} variant="default" w="100%">{form.values.file ? 'Change':'Upload'} CSV</Button>}
                </FileButton>



                <Box ta="center">
                    <Button
                        className={classes.button}
                        sx={{ ':hover': { background: '#F2AE1C' } }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </Modal>
    )
}

export default AddCohortModal
