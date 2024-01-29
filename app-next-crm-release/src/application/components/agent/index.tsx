import AgentDashboardTable from '@/application/components/agent/AgentDashboardTable'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { loadBuckets } from '@/application/redux/networkThunk/agent/campaignBucket'
import { setBucket } from '@/application/redux/states/agent/campaignBucket'
import { ICampaignBucketState } from '@/application/redux/states/agent/campaignBucket/types'
import { IAuthState } from '@/application/redux/states/shared/auth/types'
import { Loader, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'


export default function Agent() {
    const dispatch = useAppDispatch()
    const { buckets, isLoading, bucket }: ICampaignBucketState = useAppSelector(state => state.campaignBucket)

    const { user }: IAuthState = useAppSelector(state => state.auth)
    useEffect(() => {

        dispatch(loadBuckets())

    }, [])

    const form = useForm({
        initialValues: {
            email: '',
        },

        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    })


    return (
        <>
            {isLoading ? <Loader/> : null}

            {buckets && (<div>
                <Select
					searchable
					clearable
                    value={bucket?.id ?? ''}
                    onChange={(tab) => dispatch(setBucket(tab as string))} placeholder="Select Cohort"
                    data={buckets.map((bucket) => ({ label: bucket.name, value: bucket.id }))}/>
                {
                    bucket && (
                        <AgentDashboardTable/>
                    )
                }
            </div>)}
        </>
    )
}