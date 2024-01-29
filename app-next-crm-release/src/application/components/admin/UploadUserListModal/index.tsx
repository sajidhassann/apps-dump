import { CRM_API_URL } from '@/application/constants/urls'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { loadBuckets } from '@/application/redux/networkThunk/agent/campaignBucket'
import { Box, Button, createStyles, Modal, Select, Text, Title, } from '@mantine/core'
import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { NotificationType, Notify } from '@/application/components/core/Notification'

interface IUploadUserListModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const useStyles = createStyles((_) => ({
    heading: {
        color: '#05046A',
        textAlign: 'center',
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
    button: {
        marginTop: '25px',
        background: '#F2AE1C',
        borderRadius: '8px',
        width: '200px',
    },
}))

function UploadUserListModal({ isOpen, setIsOpen }: IUploadUserListModalProps) {
    const { classes } = useStyles()
    const inputFile = useRef<HTMLInputElement>(null)
    const [cohortID, setCohortID] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null)

    const dispatch = useAppDispatch()
    const cohorts = useAppSelector(state => state.campaignBucket.buckets)

    console.log('cohorts :>> ', cohorts)

    const transformedCohorts = cohorts.map((cohort: any) => {
        return {
            label: cohort.name,
            value: cohort.id,
        }
    })

    useEffect(() => {
        dispatch(loadBuckets())
    }, [dispatch])

    return (
        <form>
            <Modal
                opened={isOpen}
                onClose={() => setIsOpen(false)}
                // overlayOpacity={0.55}
                // overlayBlur={3}
                // transition="fade"
                // transitionDuration={600}
                size="sm"
                centered
                // transitionTimingFunction="ease"
                title={
                    <Title order={3} className={classes.heading}>
                        Upload User List
                    </Title>
                }
            >
                <Box sx={{ marginTop: '40px' }}>
                    <Box
                        className={classes.container}
                        onClick={() => {
                            if (inputFile?.current) inputFile?.current.click()
                        }}
                    >
                        <input
                            type="file"
                            accept=".csv"
                            id="file"
                            ref={inputFile}
                            style={{ display: 'none' }}
                            onChange={(event) => {
                                if (event.target.files?.[0])  setFile(event.target.files?.[0]) 
                            }}
                        />
                        <svg
                            width="60"
                            height="60"
                            viewBox="0 0 60 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.5 60C5.4375 60 3.6725 59.2663 2.205 57.7988C0.734999 56.3288 0 54.5625 0 52.5V41.25H7.5V52.5H52.5V41.25H60V52.5C60 54.5625 59.2663 56.3288 57.7988 57.7988C56.3288 59.2663 54.5625 60 52.5 60H7.5ZM26.25 45V14.4375L16.5 24.1875L11.25 18.75L30 0L48.75 18.75L43.5 24.1875L33.75 14.4375V45H26.25Z"
                                fill="#B6B6B6"
                            />
                        </svg>
                    </Box>
                    <Text ta="center" className={classes.excerpt}>
                        Upload CSV from your device
                    </Text>
                    {file?.name}
                    <Box sx={{ marginTop: '25px' }}>
                        <Select
                            label="Cohort"
                            placeholder='Please select a cohort to upload'
                            defaultValue={transformedCohorts[0]}
                            data={transformedCohorts}
                            value={cohortID}
                            onChange={(value) => setCohortID(value)}
                        />
                    </Box>
                    <Box ta="center">
                        <Button
                            className={classes.button}
                            sx={{ ':hover': { background: '#F2AE1C' } }}
                            disabled={!(file && cohortID)}
                            onClick={() => {
                                console.log('cohortID :>> ', cohortID)
                                console.log('file :>> ', file)
                                const formData = new FormData()
                                if (!(file && cohortID)) return
                                formData.append('cohortID', cohortID)
                                formData.append('file', file)
                                axios.post(`${CRM_API_URL}/admin/upload/csv/cohort-calls`, {  cohortID, file }, {
                                    headers: {
                                      'Content-Type': 'multipart/form-data'
                                    }
                                  }).then(response => {
                                    console.log('response :>> ', response)
                                    setIsOpen(false)
                                    Notify({
                                        type: NotificationType.SUCCESS,
                                        message: 'List uploaded successfully',
                                        title: 'Cohort users',
                                    })
                                })
                            }}
                        >
                            Done
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </form>
    )
}

export default UploadUserListModal
